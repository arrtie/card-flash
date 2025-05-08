/** @format */

import { isLeft, isRight, left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { useCallback, useEffect, useState } from "preact/hooks";
import { getFlashcards, postFlashcard } from "../api/flashcards";
import { Flashcard } from "../model";
import FlashcardDeck from "./FlashcardDeck";

const sendQAFormDataToAPI = async (
  e: Event & { currentTarget: HTMLFormElement }
) => {
  const formData = new FormData(e.currentTarget);
  const question = formData.get("question") ?? "empty question";
  const answer = formData.get("answer") ?? "empty answer";

  const response = await postFlashcard({
    question: question.toString(),
    answer: answer.toString(),
  });

  return response instanceof Error ? response.message : "success";
};

export default function ManualFlashcard() {
  const [responseData, setResponseData] = useState<Flashcard[]>();
  const [error, setError] = useState<string>("none yet");

  const handleSubmit = useCallback(
    async (e: Event & { currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      pipe(
        e,
        sendQAFormDataToAPI,
        async (postPromise) => {
          const response = await postPromise;
          return response === "success" ? right(response) : left(response);
        },
        async (eitherPromise) => {
          const result = await eitherPromise;
          if (isRight(result)) {
            return right(getFlashcards());
          }
          return result;
        },
        async (eitherPromise) => {
          const maybePromise = await eitherPromise;
          if (isRight(maybePromise)) {
            const result = await maybePromise.right;
            if (result instanceof Error) {
              return left(result.message);
            }
            return right(result);
          }
          return maybePromise;
        },
        async (dataOrErrorPromise) => {
          const dataOrError = await dataOrErrorPromise;
          if (isLeft(dataOrError)) {
            setError(dataOrError.left);
          } else {
            setResponseData(dataOrError.right);
          }
        }
      );
    },
    []
  );

  useEffect(() => {
    pipe(getFlashcards(), async (dataOrErrorPromise) => {
      const dataOrError = await dataOrErrorPromise;
      if (dataOrError instanceof Error) {
        setError(dataOrError.message);
      } else {
        setResponseData(dataOrError);
      }
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} name="flashcard_submission">
        <fieldset>
          <label for="question">
            Question: <span aria-label="required">*</span>
          </label>
          <textarea id="question" name="question" required></textarea>
        </fieldset>
        <fieldset>
          <label for="answer">
            Answer: <span aria-label="required">*</span>
          </label>
          <textarea id="answer" name="answer" required></textarea>
        </fieldset>
        <button type="submit">Flash card</button>
      </form>
      <FlashcardDeck flashcards={responseData} error={error} />
    </>
  );
}

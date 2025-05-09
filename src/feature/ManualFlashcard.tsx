/** @format */

import { left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { useCallback } from "preact/hooks";
import { postFlashcard } from "../api/flashcards";

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
  const handleSubmit = useCallback(
    async (e: Event & { currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      pipe(e, sendQAFormDataToAPI, async (postPromise) => {
        const response = await postPromise;
        return response === "success" ? right(response) : left(response);
      });
    },
    []
  );

  return (
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
  );
}

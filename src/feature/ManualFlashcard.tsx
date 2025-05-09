/** @format */

import { left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { useCallback } from "preact/hooks";
import { submitFlashcards } from "../adapters/flashcardSubmitter";

const sendQAFormDataToAPI = async (
  e: Event & { currentTarget: HTMLFormElement }
) => {
  const formData = new FormData(e.currentTarget);
  const question = formData.get("question") ?? "empty question";
  const answer = formData.get("answer") ?? "empty answer";

  const responses = await submitFlashcards([
    {
      question: question.toString(),
      answer: answer.toString(),
    },
  ]);
  const firstResponse = responses[0];
  return firstResponse instanceof Error ? firstResponse.message : "success";
};

const labelStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
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
    <section>
      <h2>Manual</h2>
      <form
        onSubmit={handleSubmit}
        name="flashcard_submission"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <label for="question" style={labelStyle}>
          Question: <span aria-label="required">*</span>
          <textarea id="question" name="question" required rows={6}></textarea>
        </label>
        <label for="answer" style={labelStyle}>
          Answer: <span aria-label="required">*</span>
          <textarea id="answer" name="answer" required rows={6}></textarea>
        </label>
        <button type="submit">Flash card</button>
      </form>
    </section>
  );
}

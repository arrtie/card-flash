/** @format */

import { useCallback, useState } from "preact/hooks";
import { Flashcard } from "../model.ts";
import FlashcardDeck from "./FlashcardDeck.tsx";

const sendToAnthro = async (e: Event & { currentTarget: HTMLFormElement }) => {
  const formData = new FormData(e.currentTarget);
  const userInput = formData.get("userInput") ?? "empty";
  const init = await import("../api/anthropothic.ts");
  const response = await init.default(userInput.toString());

  return response.status === "success" ? response.flashcards : response.message;
};

export default function DataConverter() {
  const [responseData, setResponseData] = useState<Flashcard[]>();
  const [error, setError] = useState<string>("none yet");

  const handleSubmit = useCallback(
    async (e: Event & { currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      const response = await sendToAnthro(e);
      console.log("response: ", response);
      if (Array.isArray(response)) {
        setResponseData(response);
      } else {
        setError(response);
      }
    },
    []
  );

  return (
    <>
      <form onSubmit={handleSubmit} name="flashcard_submission">
        <label for="userInput">
          User input: <span aria-label="required">*</span>
        </label>
        <textarea id="userInput" name="userInput" required></textarea>
        <button type="submit">DO IT</button>
      </form>
      <FlashcardDeck flashcards={responseData} error={error} />
    </>
  );
}

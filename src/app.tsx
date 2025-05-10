/** @format */

import { isLeft, left, map, match, right } from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import { useCallback, useEffect, useState } from "preact/hooks";
import "./app.css";
import DataConverter from "./feature/DataConverter.tsx";
import { submitFlashcardsToMutator } from "./feature/DeckMutator.ts";
import DeckWrapper from "./feature/DeckWrapper.tsx";
import FlashcardsProvider from "./feature/FlashcardsProvider.tsx";
import ManualFlashcard from "./feature/ManualFlashcard.tsx";
import { Flashcard } from "./model.ts";

const generateFormData = (e: Event & { currentTarget: HTMLFormElement }) => {
  const formData = new FormData(e.currentTarget);
  const userInput = formData.get("userInput");
  return userInput == null
    ? left("empty user input")
    : right(userInput.toString());
};

const sendFormDataToAnthro = async (userInput: string) => {
  const init = await import("./api/anthropothic.ts");
  const response = await init.default(userInput);
  return response.status === "success"
    ? right(response.flashcards)
    : left(response.message);
};

const submitUserInput = flow(
  generateFormData,
  map(sendFormDataToAnthro),
  async (maybeUserInputPromise) => {
    if (isLeft(maybeUserInputPromise)) {
      return maybeUserInputPromise;
    }
    const maybeUserInput = await maybeUserInputPromise.right;
    if (isLeft(maybeUserInput)) {
      return maybeUserInput;
    } else {
      return maybeUserInput;
    }
  }
);

export function App() {
  const [error, setError] = useState<string>("none yet");

  const handleSubmit = useCallback(
    async (e: Event & { currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      pipe(e, submitUserInput, async (responsePromise) => {
        const response = await responsePromise;
        match<string, Flashcard[], void>(
          (errorString) => setError(errorString),
          (flashcards) => {
            console.log("flashcards returned from Anthropic", flashcards);
            submitFlashcardsToMutator(flashcards);
          }
        )(response);
      });
    },
    []
  );

  useEffect(() => {
    console.error("error", error);
  }, [error]);

  return (
    <main>
      <h1>{import.meta.env.VITE_PAGE_TITLE}</h1>
      <DataConverter handleSubmit={handleSubmit} />
      <ManualFlashcard />
      <FlashcardsProvider>
        <DeckWrapper />
      </FlashcardsProvider>
    </main>
  );
}

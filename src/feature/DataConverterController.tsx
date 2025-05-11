/** @format */

import { isLeft, left, map, match, right } from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import { useCallback, useEffect, useState } from "preact/hooks";
import { IFlashcard } from "../model.ts";
import DataConverter from "./DataConverter.tsx";
import { submitFlashcards } from "./DeckMutator.ts";

const generateFormData = (e: Event & { currentTarget: HTMLFormElement }) => {
  const formData = new FormData(e.currentTarget);
  const userInput = formData.get("userInput");
  return userInput == null
    ? left("empty user input")
    : right(userInput.toString());
};
const sendFormDataToAnthro = async (userInput: string) => {
  const init = await import("../api/anthropothic.ts");
  const response = await init.default(userInput);
  return response.status === "success"
    ? right(response.flashcards)
    : left(response.message);
};

export const submitUserInput = flow(
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

export default function DataConverterController() {
  const [error, setError] = useState<string>("none yet");

  const handleSubmit = useCallback(
    async (e: Event & { currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      pipe(e, submitUserInput, async (responsePromise) => {
        const response = await responsePromise;
        match<string, IFlashcard[], void>(
          (errorString) => setError(errorString),
          (flashcards) => {
            console.log("flashcards returned from Anthropic", flashcards);
            submitFlashcards(flashcards);
          }
        )(response);
      });
    },
    []
  );

  useEffect(() => {
    console.error("error", error);
  }, [error]);

  return <DataConverter handleSubmit={handleSubmit} />;
}

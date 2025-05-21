/** @format */

import { isLeft, left, map, match, right } from "fp-ts/lib/Either";
import { flow, pipe } from "fp-ts/lib/function";
import { submitFlashcards } from "../../features/DeckMutator.ts";
import { IFlashcard } from "../../model.ts";
import DataConverter from "./DataConverterView.tsx";

const generateFormData = (e: Event & { currentTarget: HTMLFormElement }) => {
  const formData = new FormData(e.currentTarget);
  const userInput = formData.get("userInput");
  return userInput == null
    ? left("empty user input")
    : right(userInput.toString());
};

const sendFormDataToAnthro = async (userInput: string) => {
  const init = await import("../../api/anthropothic.ts");
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

export const submitFlashcardsEffect = async (
  e: Event & { currentTarget: HTMLFormElement }
) => {
  e.preventDefault();

  return pipe(e, submitUserInput, async (responsePromise) => {
    const response = await responsePromise;
    match<string, IFlashcard[], void>(
      console.error,
      submitFlashcards
    )(response);
  });
};

export default function PasteFlashcard() {
  return <DataConverter handleSubmit={submitFlashcardsEffect} />;
}

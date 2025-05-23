/** @format */

import { isLeft, left, map, match, right } from 'fp-ts/lib/Either.js';
import { flow, pipe } from 'fp-ts/lib/function.js';
import type { FormEvent, FormEventHandler } from 'react';
import { submitFlashcards } from '../../features/DeckMutator.js';
import type { IFlashcard } from '../../model.js';
import DataConverter from './DataConverterView.js';

const generateFormData = (e: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(e.currentTarget);
  const userInput = formData.get('userInput');
  return userInput == null
    ? left('empty user input')
    : right(userInput.toString());
};

const sendFormDataToAnthro = async (userInput: string) => {
  const init = await import('../../api/anthropothic.js');
  const response = await init.default(userInput);
  return response.status === 'success'
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
  },
);

export const submitFlashcardsEffect: FormEventHandler<HTMLFormElement> = async (
  e,
) => {
  e.preventDefault();

  return pipe(e, submitUserInput, async (responsePromise) => {
    const response = await responsePromise;
    match<string, IFlashcard[], void>(
      console.error,
      submitFlashcards,
    )(response);
  });
};

export default function PasteFlashcard() {
  return <DataConverter handleSubmit={submitFlashcardsEffect} />;
}

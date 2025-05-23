/** @format */

import { pipe } from 'fp-ts/lib/function.js';
import type { ReactEventHandler } from 'react';
import { submitFlashcards } from '../../features/DeckMutator.js';

const formatFormData = (e: React.SyntheticEvent<HTMLFormElement, Event>) => {
  const formData = new FormData(e.currentTarget);
  const question = formData.get('question') ?? 'empty question';
  const answer = formData.get('answer') ?? 'empty answer';

  return [
    {
      question: question.toString(),
      answer: answer.toString(),
    },
  ];
};

export const handleSubmit: ReactEventHandler<HTMLFormElement> = async (e) => {
  e.preventDefault();
  pipe(e, formatFormData, submitFlashcards);
};

/** @format */

import { postFlashcard } from '../api/flashcards.js';
import type { IFlashcard } from '../model.js';

export const submitFlashcards = (flashcards: IFlashcard[]) => {
  const submittedCards = flashcards.map((flashcard) => {
    return postFlashcard(flashcard);
  });
  return Promise.all(submittedCards);
};

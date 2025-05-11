/** @format */

import { postFlashcard } from "../api/flashcards";
import { IFlashcard } from "../model";

export const submitFlashcards = (flashcards: IFlashcard[]) => {
  const submittedCards = flashcards.map((flashcard) => {
    return postFlashcard(flashcard);
  });
  return Promise.all(submittedCards);
};

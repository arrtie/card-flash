/** @format */

import { postFlashcard } from "../api/flashcards";
import { Flashcard } from "../model";

export const submitFlashcards = (flashcards: Flashcard[]) => {
  const submittedCards = flashcards.map((flashcard) => {
    return postFlashcard(flashcard);
  });
  return Promise.all(submittedCards);
};

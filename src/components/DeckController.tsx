/** @format */

import { useState } from "preact/hooks";
import { deleteFlashcard } from "../api/flashcards";
import { reviewFlashcard } from "../feature/DeckMutator";
import useFlashcards from "../feature/useFlashcards";
import { IFlashcard } from "../model";
import FlashcardDeck from "./FlashcardDeck";

export default function DeckController() {
  const [error, setError] = useState<string>("");
  const flashcards = useFlashcards();

  const onDelete = (qAndA: IFlashcard) =>
    deleteFlashcard(qAndA.question).catch((err) => {
      console.error(err);
      setError(err.message);
    });

  const onReview = (flashcard: IFlashcard) => {
    reviewFlashcard(flashcard).catch((err) => {
      console.error(err);
      setError(err.message);
    });
  };

  return (
    <FlashcardDeck
      flashcards={flashcards}
      error={error}
      onDelete={onDelete}
      onReview={onReview}
    />
  );
}

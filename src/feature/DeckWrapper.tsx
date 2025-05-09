/** @format */

import { useState } from "preact/hooks";
import { deleteFlashcard } from "../api/flashcards";
import { Flashcard } from "../model";
import FlashcardDeck from "./FlashcardDeck";
import useFlashcards from "./useFlashcards";

export default function DeckWrapper() {
  const [error, setError] = useState<string>("");
  const flashcards = useFlashcards();
  console.log("flashcards: ", flashcards);

  const onDelete = (qAndA: Flashcard) =>
    deleteFlashcard(qAndA.question).catch((err) => {
      console.error(err);
      setError(err.message);
    });

  return (
    <FlashcardDeck flashcards={flashcards} error={error} onDelete={onDelete} />
  );
}

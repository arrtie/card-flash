/** @format */

import { useContext } from "preact/hooks";
import FlashcardsContext from "./FlashcardContext";

export default function useFlashcards() {
  const { flashcards } = useContext(FlashcardsContext);
  console.log("flashcards: ", flashcards);
  return flashcards;
}

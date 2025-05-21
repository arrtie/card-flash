/** @format */

import { useContext } from "preact/hooks";
import FlashcardsContext from "../contexts/FlashcardContext";

export default function useFlashcards() {
  return useContext(FlashcardsContext).flashcards;
}

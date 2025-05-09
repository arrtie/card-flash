/** @format */

import { createContext } from "preact";
import { Flashcard } from "../model";

interface IFlashcardsContext {
  flashcards: Flashcard[];
}

const initialState: IFlashcardsContext = {
  flashcards: [],
};

export const FlashcardsContext =
  createContext<IFlashcardsContext>(initialState);

export default FlashcardsContext;

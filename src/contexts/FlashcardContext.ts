/** @format */

import { createContext } from "preact";
import { IFlashcard } from "../model";

interface IFlashcardsContext {
  flashcards: IFlashcard[];
}

const initialState: IFlashcardsContext = {
  flashcards: [],
};

export const FlashcardsContext =
  createContext<IFlashcardsContext>(initialState);

export default FlashcardsContext;

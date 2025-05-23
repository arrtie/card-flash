/** @format */

import { createContext } from 'react';
import type { IFlashcard } from '../model.js';

interface IFlashcardsContext {
  flashcards: IFlashcard[];
}

const initialState: IFlashcardsContext = {
  flashcards: [],
};

export const FlashcardsContext =
  createContext<IFlashcardsContext>(initialState);

export default FlashcardsContext;

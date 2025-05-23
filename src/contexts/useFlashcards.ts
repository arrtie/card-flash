/** @format */

import { useContext } from 'react';
import FlashcardsContext from '../contexts/FlashcardContext.js';

export default function useFlashcards() {
  return useContext(FlashcardsContext).flashcards;
}

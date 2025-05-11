/** @format */

import { matchW } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import {
  createFlashcard,
  destroyFlashcard,
  getAllFlashcards,
} from "../backend/flashcardsIDB";

export const getFlashcards = flow(
  getAllFlashcards,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise
  )
);

export const postFlashcard = flow(
  createFlashcard,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise
  )
);

export const deleteFlashcard = flow(
  destroyFlashcard,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise
  )
);

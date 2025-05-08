/** @format */

import { matchW } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { createFlashcard, getAllFlashcards } from "../adapters/indexedDB";

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

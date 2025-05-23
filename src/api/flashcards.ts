/** @format */

import { matchW } from 'fp-ts/lib/Either.js';
import { flow } from 'fp-ts/lib/function.js';
import {
  createDBFlashcard,
  destroyDBFlashcard,
  getAllDBFlashcards,
  updateDBFlashcard,
} from '../db/flashcardsIDB.js';

import type { IFlashcard } from '../model.js';

export const getFlashcards: () => Promise<IFlashcard[] | Error> = flow(
  getAllDBFlashcards,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise,
  ),
);

export const postFlashcard = flow(
  createDBFlashcard,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise,
  ),
);

export const deleteFlashcard = flow(
  destroyDBFlashcard,
  matchW(
    (error) => Promise.resolve(error),
    (dbPromise) => dbPromise,
  ),
);

export const updateFlashcard = flow(
  updateDBFlashcard,
  matchW(
    () => Promise.resolve(new Error('Update failed')),
    (dbPromise) => dbPromise,
  ),
);

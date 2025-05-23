/** @format */

import {
  deleteFlashcard as deleteFlashcardAPI,
  postFlashcard,
  updateFlashcard as updateFlashcardAPI,
} from '../api/flashcards.js';
import type { IFlashcard, IQA } from '../model.js';
import Observer from '../patterns/Observer.js';
import { Subject } from '../patterns/Subject.js';

export type DeckMutatorEvent = 'update';
const deckMutatorSubject = new Subject<DeckMutatorEvent>();

export const emitUpdate = () => {
  deckMutatorSubject.notify('update');
};

export const subscribeToDeckMutator = (obs: Observer<DeckMutatorEvent>) => {
  deckMutatorSubject.attach(obs);
  return () => {
    deckMutatorSubject.detach(obs);
  };
};

export const submitFlashcards = async (flashcards: IQA[]) => {
  const submittedCards = flashcards.map((flashcard) => {
    return postFlashcard(flashcard);
  });

  const result = await Promise.all(submittedCards);
  const isValid = result.every((result) => result === undefined);
  if (isValid) {
    emitUpdate();
  }
};

export const deleteFlashcard = (qAndA: IFlashcard) => {
  deleteFlashcardAPI(qAndA.question).finally(() => {
    emitUpdate();
  });
};

export const reviewFlashcard = async (flashcard: IFlashcard) => {
  return updateFlashcardAPI({
    ...flashcard,
    last_review_success: Date.now(),
  }).then(() => {
    emitUpdate();
  });
};

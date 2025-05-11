/** @format */

import {
  deleteFlashcard as deleteFlashcardAPI,
  postFlashcard,
} from "../api/flashcards";
import { IFlashcard } from "../model";
import Observer from "../patterns/Observer";
import { Subject } from "../patterns/Subject";

export type DeckMutatorEvent = "update";
const deckMutatorSubject = new Subject<DeckMutatorEvent>();

export const emitUpdate = () => {
  deckMutatorSubject.notify("update");
};

export const subscribeToDeckMutator = (obs: Observer<DeckMutatorEvent>) => {
  deckMutatorSubject.attach(obs);
  return () => {
    deckMutatorSubject.detach(obs);
  };
};

export const submitFlashcards = async (flashcards: IFlashcard[]) => {
  const submittedCards = flashcards.map((flashcard) => {
    return postFlashcard(flashcard);
  });

  const result = await Promise.all(submittedCards);
  const isValid = result.every((result) => result === undefined);
  if (isValid) {
    emitUpdate();
  }
};

// hypothesis: using the mutator will allow me to create side-effects when the deck has been updated

export const deleteFlashcard = (qAndA: IFlashcard) => {
  deleteFlashcardAPI(qAndA.question).finally(() => {
    emitUpdate();
  });
};

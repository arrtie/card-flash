/** @format */

import { submitFlashcards } from "../adapters/flashcardSubmitter";
import { Flashcard } from "../model";
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

export const submitFlashcardsToMutator = async (flaschards: Flashcard[]) => {
  const result = await submitFlashcards(flaschards);
  const isValid = result.every((result) => result === undefined);
  if (isValid) {
    emitUpdate();
  }
};

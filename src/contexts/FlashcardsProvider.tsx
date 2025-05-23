/** @format */

import { flow } from 'fp-ts/lib/function.js';
import { useEffect, useState, type ReactNode } from 'react';
import { getFlashcards } from '../api/flashcards.js';
import FlashcardsContext from '../contexts/FlashcardContext.js';
import {
  subscribeToDeckMutator,
  type DeckMutatorEvent,
} from '../features/DeckMutator.js';
import type { IFlashcard } from '../model.js';
import Observer from '../patterns/Observer.js';

interface FlashcardsProviderProps {
  children: ReactNode;
}

export default function FlashcardsProvider({
  children,
}: FlashcardsProviderProps) {
  const flashcardsFeedData = useFlashcardsDataFeed();

  return (
    <FlashcardsContext.Provider value={{ flashcards: flashcardsFeedData }}>
      {children}
    </FlashcardsContext.Provider>
  );
}

function useFlashcardsDataFeed(): IFlashcard[] {
  const [flashcardsFeedData, setFlashcardsFeedData] = useState<IFlashcard[]>(
    [],
  );

  useEffect(() => {
    const fetchFlashcards = flow(getFlashcards, async (dataOrErrorPromise) => {
      const dataOrError = await dataOrErrorPromise;
      if (dataOrError instanceof Error) {
        return;
      }
      setFlashcardsFeedData(dataOrError as IFlashcard[]);
    });

    const unsub = subscribeToDeckMutator(
      new Observer<DeckMutatorEvent>(fetchFlashcards),
    );

    // fetch on mount
    fetchFlashcards();

    return () => {
      unsub();
    };
  }, []);

  return flashcardsFeedData;
}

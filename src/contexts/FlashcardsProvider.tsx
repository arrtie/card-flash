/** @format */

import { flow } from "fp-ts/lib/function";
import { ReactNode } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { getFlashcards } from "../api/flashcards";
import FlashcardsContext from "../contexts/FlashcardContext";
import {
  DeckMutatorEvent,
  subscribeToDeckMutator,
} from "../features/DeckMutator";
import { IFlashcard } from "../model";
import Observer from "../patterns/Observer";

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
    []
  );

  useEffect(() => {
    const fetchFlashcards = flow(getFlashcards, async (dataOrErrorPromise) => {
      const dataOrError = await dataOrErrorPromise;
      if (dataOrError instanceof Error) {
        return;
      }
      setFlashcardsFeedData(dataOrError);
    });

    const unsub = subscribeToDeckMutator(
      new Observer<DeckMutatorEvent>(fetchFlashcards)
    );

    // fetch on mount
    fetchFlashcards();

    return () => {
      unsub();
    };
  }, []);

  return flashcardsFeedData;
}

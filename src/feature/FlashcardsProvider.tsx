/** @format */

import { flow } from "fp-ts/lib/function";
import { ReactNode } from "preact/compat";
import { useEffect, useMemo, useState } from "preact/hooks";
import { getFlashcards } from "../api/flashcards";
import { IFlashcard } from "../model";
import Observer from "../patterns/Observer";
import { DeckMutatorEvent, subscribeToDeckMutator } from "./DeckMutator";
import FlashcardsContext from "./FlashcardContext";

interface FlashcardsProviderProps {
  children: ReactNode;
}

export default function FlashcardsProvider({
  children,
}: FlashcardsProviderProps) {
  const flashcardsFeedData = useFlashcardsDataFeed();
  const flashcardsValue = useMemo(
    () => ({
      flashcards: flashcardsFeedData,
    }),
    [flashcardsFeedData]
  );
  return (
    <FlashcardsContext.Provider value={flashcardsValue}>
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
      if (!(dataOrError instanceof Error)) {
        setFlashcardsFeedData(dataOrError);
      }
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

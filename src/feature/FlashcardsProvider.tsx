/** @format */

import { flow } from "fp-ts/lib/function";
import { ReactNode } from "preact/compat";
import { useEffect, useMemo, useState } from "preact/hooks";
import { getFlashcards } from "../api/flashcards";
import { Flashcard } from "../model";
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

function useFlashcardsDataFeed(): Flashcard[] {
  const [flashcardsFeedData, setFlashcardsFeedData] = useState<Flashcard[]>([]);

  useEffect(() => {
    const fetchFlashcards = flow(getFlashcards, async (dataOrErrorPromise) => {
      const dataOrError = await dataOrErrorPromise;
      if (!(dataOrError instanceof Error)) {
        setFlashcardsFeedData(dataOrError);
      }
    });
    // fetch on mount
    fetchFlashcards();
    // TODO: don't use an interval
    const interval = setInterval(fetchFlashcards, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return flashcardsFeedData;
}

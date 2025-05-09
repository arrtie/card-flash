/** @format */

import { ReactNode } from "preact/compat";
import { useEffect, useMemo, useState } from "preact/hooks";
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
  const [flashcardsFeedData, setFlashcardsFeedData] = useState<Flashcard[]>([
    { question: "yes?", answer: "no" },
  ]);

  useEffect(() => {
    // TODO: actually load data here
    const interval = setInterval(() => {
      setFlashcardsFeedData([{ question: "yes?", answer: "no" }]);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return flashcardsFeedData;
}

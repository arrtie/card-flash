/** @format */

import { useMemo, useState } from "preact/hooks";
import { deleteFlashcard } from "../api/flashcards";
import { reviewFlashcard } from "../feature/DeckMutator";
import {
  getBetweenNeverAnd1,
  getReviewedFlashcards,
  getUnreviewedFlashcards,
} from "../feature/FlashcardsFilter";
import useFlashcards from "../feature/useFlashcards";
import { IFlashcard } from "../model";
import FlashcardDeck from "./FlashcardDeck";

const filterStates = ["ALL", "REVIEWED", "UNREVIEWED", "NEVERANDONE"] as const;
type FilterState = (typeof filterStates)[number];
export default function DeckController() {
  const [error, setError] = useState<string>("");
  const [filterState, setFilterState] = useState<FilterState>("ALL");
  const flashcards = useFlashcards();

  const flashcardsFiltered = useMemo(() => {
    if (filterState === "NEVERANDONE") {
      return getBetweenNeverAnd1(flashcards);
    }
    if (filterState === "REVIEWED") {
      return getReviewedFlashcards(flashcards);
    }
    if (filterState === "UNREVIEWED") {
      return getUnreviewedFlashcards(flashcards);
    }
    return flashcards;
  }, [flashcards, filterState]);

  const onDelete = (qAndA: IFlashcard) =>
    deleteFlashcard(qAndA.question).catch((err) => {
      console.error(err);
      setError(err.message);
    });

  const onReview = (flashcard: IFlashcard) => {
    reviewFlashcard(flashcard).catch((err) => {
      console.error(err);
      setError(err.message);
    });
  };

  return (
    <>
      <select
        value={filterState}
        onChange={(e) => {
          setFilterState(e.currentTarget.value as FilterState);
        }}
      >
        {filterStates.map((_filterState) => {
          return (
            <option value={_filterState} key={_filterState}>
              {_filterState}
            </option>
          );
        })}
      </select>
      <FlashcardDeck
        flashcards={flashcardsFiltered}
        error={error}
        onDelete={onDelete}
        onReview={onReview}
      />
    </>
  );
}

/** @format */

import { useMemo, useState } from 'react';
import { deleteFlashcard } from '../../api/flashcards.js';
import { reviewFlashcard } from '../../features/DeckMutator.js';
import {
  getBetweenNeverAnd1,
  getReviewedFlashcards,
  getUnreviewedFlashcards,
} from '../../features/FlashcardsFilter.js';

import useFlashcards from '../../contexts/useFlashcards.js';
import type { IFlashcard } from '../../model.js';
import FlashcardDeck from './FlashcardDeckView.js';

const filterStates = ['ALL', 'REVIEWED', 'UNREVIEWED', 'NEVERANDONE'] as const;
type FilterState = (typeof filterStates)[number];

export default function DeckController() {
  const [error, setError] = useState<string>('');
  const [filterState, setFilterState] = useState<FilterState>('ALL');
  const flashcards = useFlashcards();

  const flashcardsFiltered = useMemo(() => {
    if (filterState === 'NEVERANDONE') {
      return getBetweenNeverAnd1(flashcards);
    }
    if (filterState === 'REVIEWED') {
      return getReviewedFlashcards(flashcards);
    }
    if (filterState === 'UNREVIEWED') {
      return getUnreviewedFlashcards(flashcards);
    }
    return flashcards;
  }, [flashcards, filterState]);

  const onDelete = (qAndA: IFlashcard) =>
    deleteFlashcard(qAndA.question).catch((err: Error) => {
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

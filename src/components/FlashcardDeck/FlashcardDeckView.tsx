/** @format */

import type { IFlashcard } from '../../model.js';
import Flashcard from '../Flashcard.js';
export type Deck = typeof FlashcardDeck;

export default function FlashcardDeck({
  flashcards,
  error,
  onDelete,
  onReview,
}: {
  flashcards: IFlashcard[];
  error: string | undefined;
  onDelete: (qAndA: IFlashcard) => void;
  onReview: (qAndA: IFlashcard) => void;
}) {
  return (
    <output>
      <h2>Deck</h2>
      {flashcards?.length == null ? null : (
        <ul>
          {flashcards.map((qAndA) => {
            return (
              <>
                <li key={qAndA.question}>
                  <Flashcard qAndA={qAndA} />
                  <button onClick={() => onDelete(qAndA)}>Delete</button>
                  <button onClick={() => onReview(qAndA)}>Review</button>
                </li>
              </>
            );
          })}
        </ul>
      )}
      {error == null ? null : <p>error: {error}</p>}
    </output>
  );
}

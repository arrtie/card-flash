/** @format */

import { IFlashcard } from "../model";
import Flashcard from "./Flashcard";

export default function FlashcardDeck({
  flashcards,
  error,
  onDelete,
  onComplete,
}: {
  flashcards: IFlashcard[];
  error: string | undefined;
  onDelete: (qAndA: IFlashcard) => void;
  onComplete: (qAndA: IFlashcard) => void;
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
                  <button onClick={() => onComplete(qAndA)}>Complete</button>
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

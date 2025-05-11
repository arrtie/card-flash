/** @format */

import { IFlashcard } from "../model";
import Flashcard from "./Flashcard";

export default function FlashcardDeck({
  flashcards,
  error,
  onDelete,
}: {
  flashcards: IFlashcard[];
  error: string | undefined;
  onDelete: (qAndA: IFlashcard) => void;
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

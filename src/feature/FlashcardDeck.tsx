/** @format */

import { Flashcard } from "../model";

export default function FlashcardDeck({
  flashcards,
  error,
}: {
  flashcards: Flashcard[];
  error: string | undefined;
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
                  <p>Q: {qAndA.question}</p>
                  <p>A: {qAndA.answer}</p>
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

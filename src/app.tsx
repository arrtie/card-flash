/** @format */

import "./app.css";
import DeckController from "./components/FlashcardDeck/DeckController.tsx";
import ManualFlashcard from "./components/ManualFlashcard";
import DataConverterController from "./components/PasteFlashcard/index.tsx";
import FlashcardsProvider from "./contexts/FlashcardsProvider.tsx";

export function App() {
  return (
    <main>
      <h1>{import.meta.env.VITE_PAGE_TITLE}</h1>
      <DataConverterController />
      <ManualFlashcard />
      <FlashcardsProvider>
        <DeckController />
      </FlashcardsProvider>
    </main>
  );
}

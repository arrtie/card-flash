/** @format */

import "./app.css";
import DataConverter from "./feature/DataConverter.tsx";
import DeckWrapper from "./feature/DeckWrapper.tsx";
import FlashcardsProvider from "./feature/FlashcardsProvider.tsx";
import ManualFlashcard from "./feature/ManualFlashcard.tsx";

export function App() {
  return (
    <main>
      <h1>{import.meta.env.VITE_PAGE_TITLE}</h1>
      <DataConverter />
      <ManualFlashcard />
      <FlashcardsProvider>
        <DeckWrapper />
      </FlashcardsProvider>
    </main>
  );
}

/** @format */

import "./app.css";
import DeckController from "./components/DeckController.tsx";
import DataConverterController from "./feature/DataConverterController.tsx";
import FlashcardsProvider from "./feature/FlashcardsProvider.tsx";
import ManualFlashcard from "./feature/ManualFlashcard.tsx";

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

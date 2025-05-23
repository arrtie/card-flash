/** @format */

import DeckController from '../components/FlashcardDeck/DeckController.js';
import ManualFlashcard from '../components/ManualFlashcard/index.js';
import DataConverterController from '../components/PasteFlashcard/index.js';
import FlashcardsProvider from '../contexts/FlashcardsProvider.js';

export default function App() {
  return (
    <>
      <DataConverterController />
      <ManualFlashcard />
      <FlashcardsProvider>
        <DeckController />
      </FlashcardsProvider>
    </>
  );
}

/** @format */

import { handleSubmit } from './ManualFlashcardController.js';
import ManualFlashcard from './ManualFlashcardView.js';

export default function ManualFlashcardController() {
  return <ManualFlashcard handleSubmit={handleSubmit} />;
}

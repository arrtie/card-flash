/** @format */

import { handleSubmit } from "./ManualFlashcardController";
import ManualFlashcard from "./ManualFlashcardView";

export default function ManualFlashcardController() {
  return <ManualFlashcard handleSubmit={handleSubmit} />;
}

/** @format */

import "./app.css";
import DataConverter from "./feature/DataConverter.tsx";
import ManualFlashcard from "./feature/ManualFlashcard.tsx";

export function App() {
  return (
    <main>
      <h1>Vite & Preact template</h1>
      <DataConverter />
      <ManualFlashcard />
    </main>
  );
}

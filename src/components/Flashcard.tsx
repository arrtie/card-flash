/** @format */

import { IFlashcard } from "../model";

const Flashcard = ({ qAndA }: { qAndA: IFlashcard }) => {
  return (
    <details>
      <summary>Q: {qAndA.question}</summary>
      <p>A: {qAndA.answer}</p>
    </details>
  );
};

export default Flashcard;

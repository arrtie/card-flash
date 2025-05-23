/** @format */

import type { IFlashcard } from '../model.js';

const Flashcard = ({ qAndA }: { qAndA: IFlashcard }) => {
  return (
    <details>
      <summary>
        <p>Q: {qAndA.question}</p>
        {qAndA.last_review_success == null ? null : (
          <p>
            last successful review:
            {new Date(qAndA.last_review_success).toLocaleDateString()}
          </p>
        )}
      </summary>
      <p>A: {qAndA.answer}</p>
    </details>
  );
};

export default Flashcard;

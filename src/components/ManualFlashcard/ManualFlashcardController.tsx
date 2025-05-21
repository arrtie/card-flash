/** @format */

import { pipe } from "fp-ts/lib/function";
import { submitFlashcards } from "../../features/DeckMutator";

const formatFormData = (e: Event & { currentTarget: HTMLFormElement }) => {
  const formData = new FormData(e.currentTarget);
  const question = formData.get("question") ?? "empty question";
  const answer = formData.get("answer") ?? "empty answer";

  return [
    {
      question: question.toString(),
      answer: answer.toString(),
    },
  ];
};

export const handleSubmit = async (
  e: Event & { currentTarget: HTMLFormElement }
) => {
  e.preventDefault();
  pipe(e, formatFormData, submitFlashcards);
};

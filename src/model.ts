/** @format */

type ResponseErrors = "missing content" | "error parsing content";

export type ParsedResponse =
  | {
      status: "success";
      flashcards: Flashcard[];
    }
  | {
      status: "failure";
      message: ResponseErrors;
    };

export interface Flashcard {
  answer: string;
  question: string;
}

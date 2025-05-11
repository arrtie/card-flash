/** @format */

export interface IFlashcard {
  answer: string;
  question: string;
}

export type ResponseErrors = "missing content" | "error parsing content";

export type ParsedResponse =
  | {
      status: "success";
      flashcards: IFlashcard[];
    }
  | {
      status: "failure";
      message: ResponseErrors;
    };

/** @format */

export interface IQA {
  answer: string;
  question: string;
}

export interface IFlashcard extends IQA {
  last_review_success: null | number;
  created: string;
  uid: string;
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

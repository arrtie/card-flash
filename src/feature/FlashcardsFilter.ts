/** @format */

import { IFlashcard } from "../model";

const getFlashcardsBetween = (start: number, stop: number) => {
  return (flashcards: IFlashcard[]) =>
    flashcards.filter(({ last_review_success: timestamp }) => {
      return timestamp != null && timestamp <= stop && timestamp >= start;
    });
};

export default getFlashcardsBetween;

const isReviewed = ({ last_review_success: timestamp }: IFlashcard) => {
  return timestamp != null;
};

const deckProvider =
  (yourFilter: (deck: IFlashcard) => boolean) => (deck: IFlashcard[]) =>
    deck.filter(yourFilter);

export const getUnreviewedFlashcards = deckProvider(
  (flashcard) => !isReviewed(flashcard)
);

export const getReviewedFlashcards = deckProvider(isReviewed);

export const getBetweenNeverAnd1 = (deck: IFlashcard[]) => {
  const unreviewd = getReviewedFlashcards(deck);
  const now = Date.now();
  const underADay = getFlashcardsBetween(now - 24 * 60 * 60 * 1000, now)(deck);
  return [...unreviewd, ...underADay];
};

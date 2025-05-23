/** @format */

import '@testing-library/dom';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  deleteFlashcard,
  getFlashcards,
  updateFlashcard,
} from '../../api/flashcards.js';
import questionToPrimaryKey from '../../helpers/uid.js';
import { App } from '../../index.js';
import type { IFlashcard } from '../../model.js';

const makeFlaschard = (props?: Partial<IFlashcard>): IFlashcard => {
  const defaultQ = 'what is the sound of one hand clapping?';
  const defaultA = 'silence';
  return {
    question: defaultQ,
    answer: defaultA,
    uid: questionToPrimaryKey(
      props?.question == null ? defaultQ : props?.question,
    ),
    created: Date.now().toString(),
    last_review_success: null,
    ...props,
  };
};

vi.mock('../api/flashcards', () => ({
  __esModule: true,
  getFlashcards: vi.fn(),
  deleteFlashcard: vi.fn(),
  updateFlashcard: vi.fn(),
  postFlashcard: vi.fn(),
}));

const mockGetFlashcards = vi.mocked(getFlashcards);
const mockDeleteFlashcard = vi.mocked(deleteFlashcard);
const mockReviewFlashcard = vi.mocked(updateFlashcard);

beforeEach(() => {
  mockGetFlashcards.mockImplementation(() => Promise.resolve([]));
  mockDeleteFlashcard.mockImplementation(async () => undefined);
  mockDeleteFlashcard.mockClear();
  mockReviewFlashcard.mockImplementation(async () => new Error());
  mockReviewFlashcard.mockClear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const renderDeckController = async () => {
  const screenUser = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const result = render(<App />);
  return { result, screenUser };
};

describe('when there are flashcards', () => {
  const flashcards: IFlashcard[] = [
    makeFlaschard({
      question: 'What is your name?',
      answer: 'artie',
    }),
  ];

  const flashcard = flashcards[0];
  if (flashcard == null) {
    throw new Error('flashcard does not exist');
  }

  beforeEach(() => {
    mockGetFlashcards.mockImplementation(async () => flashcards);
  });

  test("the flashcards' elements are accessible", async () => {
    renderDeckController();
    await waitFor(() => {
      expect(
        screen.queryAllByText(new RegExp(flashcard.question)),
      ).toHaveLength(1);
      expect(screen.queryAllByText(new RegExp(flashcard.answer))).toHaveLength(
        1,
      );
      expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Review' })).toBeDefined();
    });
  });

  describe("when a card's 'delete' button is clicked", () => {
    const renderAndDelete = async () => {
      const result = await renderDeckController();
      await waitFor(() => {
        screen.getByRole('button', { name: 'Delete' });
      });
      await result.screenUser.click(
        screen.getByRole('button', { name: 'Delete' }),
      );
      return result;
    };

    test('the card is removed', async () => {
      await renderAndDelete();
      expect(mockDeleteFlashcard).toHaveBeenCalledWith('What is your name?');
    });
  });

  describe("when a card's 'review' button is clicked", () => {
    const renderAndReview = async () => {
      const now = Date.now();
      const result = await renderDeckController();
      await waitFor(() => {
        screen.getByRole('button', { name: 'Review' });
      });
      await result.screenUser.click(
        screen.getByRole('button', { name: 'Review' }),
      );
      return { result, mocks: { now } };
    };

    test('the card is posted for update with new values', async () => {
      const {
        mocks: { now },
      } = await renderAndReview();
      expect(mockReviewFlashcard).toHaveBeenCalledWith({
        ...flashcard,
        last_review_success: now,
      });
    });
  });
});

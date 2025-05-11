/** @format */

import "@testing-library/dom";
import { render, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { deleteFlashcard, getFlashcards } from "../api/flashcards";
import { App } from "../app";

vi.mock("../api/flashcards", () => ({
  __esModule: true,
  getFlashcards: vi.fn(),
  deleteFlashcard: vi.fn(),
  completeFlashcard: vi.fn(),
  postFlashcard: vi.fn(),
}));

const mockGetFlashcards = vi.mocked(getFlashcards);
const mockDeleteFlashcard = vi.mocked(deleteFlashcard);
const mockCompleteFlashcard = vi.mocked(deleteFlashcard);

beforeEach(() => {
  mockGetFlashcards.mockImplementation(() => Promise.resolve([]));
  mockDeleteFlashcard.mockImplementation(async () => undefined);
  mockDeleteFlashcard.mockClear();
  mockDeleteFlashcard.mockImplementation(async () => undefined);
  mockDeleteFlashcard.mockClear();
});

const renderDeckController = async () => {
  const screenUser = userEvent.setup();
  const result = render(<App />);
  return { result, screenUser };
};

describe("when there are flashcards", () => {
  const flashcards = [
    {
      question: "What is your name?",
      answer: "artie",
    },
  ];

  beforeEach(() => {
    mockGetFlashcards.mockImplementation(async () => flashcards);
  });

  test("the flashcards' elements are accessible", async () => {
    renderDeckController();
    const flashcard = flashcards[0];
    await waitFor(() => {
      expect(
        screen.queryAllByText(new RegExp(flashcard.question))
      ).toHaveLength(1);
      expect(screen.queryAllByText(new RegExp(flashcard.answer))).toHaveLength(
        1
      );
      expect(screen.getByRole("button", { name: "Delete" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Complete" })).toBeDefined();
    });
  });

  describe("when a card's 'delete' button is clicked", () => {
    const renderAndDelete = async () => {
      const result = await renderDeckController();
      await waitFor(() => {
        screen.getByRole("button", { name: "Delete" });
      });
      await result.screenUser.click(
        screen.getByRole("button", { name: "Delete" })
      );
      return result;
    };

    test("the card is removed", async () => {
      await renderAndDelete();
      expect(mockDeleteFlashcard).toHaveBeenCalledWith("What is your name?");
    });
  });

  describe("when a card's 'complete' button is clicked", () => {
    const renderAndComplete = async () => {
      const result = await renderDeckController();
      await waitFor(() => {
        screen.getByRole("button", { name: "Complete" });
      });
      await result.screenUser.click(
        screen.getByRole("button", { name: "Complete" })
      );
      return result;
    };

    test("the card is removed", async () => {
      await renderAndComplete();
      expect(mockCompleteFlashcard).toHaveBeenCalledWith("What is your name?");
    });
  });
});

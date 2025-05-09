/** @format */

import { render, screen } from "@testing-library/preact";
import { App } from "../app";

function renderApp() {
  return render(<App />);
}

describe("by default", () => {
  it("should find the heading", async () => {
    renderApp();
    expect(screen.getByRole("heading", { name: "Card Flash" }));
  });
});

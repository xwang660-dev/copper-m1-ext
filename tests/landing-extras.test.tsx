import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

// Frontend polish added after Module 1: extra hero link and plan badge.
describe("Landing page extras", () => {
  it("keeps one h1 and the See products link", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /see products/i })).toHaveAttribute(
      "href",
      "#products",
    );
  });

  it("links See plans to the Plus section", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /see plans/i })).toHaveAttribute(
      "href",
      "#plus",
    );
  });

  it("shows the New pill in the hero", () => {
    render(<Home />);
    expect(
      within(screen.getByTestId("hero")).getByText("New for 2026"),
    ).toBeInTheDocument();
  });

  it("marks only Copper Plus as most popular", () => {
    const { container } = render(<Home />);
    const popular = screen.getAllByText("Most popular");
    expect(popular).toHaveLength(1);
    expect(
      container.querySelector('[data-plan="copper-plus"]'),
    ).toContainElement(popular[0]);
  });
});

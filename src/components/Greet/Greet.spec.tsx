import { render, screen } from "@testing-library/react";
import Greet from "./Greet";

describe("Greet", () => {
  it("renders correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText(/Hello/i);
    expect(textElement).toBeInTheDocument();
  });

  it("renders correctly with name", () => {
    const name = "Ernest";

    render(<Greet name={name} />);
    const textElement = screen.getByText((content) =>
      // Substring matching
      content?.toLowerCase()?.includes("hello")
    );
    expect(textElement).toBeInTheDocument();
  });
});

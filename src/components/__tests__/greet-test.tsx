import { render, screen } from "@testing-library/react";
import Greet from "../Greet/Greet";

describe("Greet", () => {
  test("renders correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText(/Hello/i);
    expect(textElement).toBeInTheDocument();
  });

  describe("Nested", () => {
    test("renders correctly with name", () => {
      const name = "Ernest";

      render(<Greet name={name} />);
      const textElement = screen.getByText((content) =>
        content?.toLowerCase()?.includes(`hello, ${name}`.toLowerCase())
      );
      expect(textElement).toBeInTheDocument();
    });
  });
});

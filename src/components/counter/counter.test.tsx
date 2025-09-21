import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Counter from "./counter";

describe("Counter", () => {
  test("renders correctly", () => {
    render(<Counter />);

    const countElement = screen.getByRole("heading");
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    expect(incrementButton).toBeInTheDocument();
  });

  test("initial count is 0", () => {
    render(<Counter />);

    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("0");
  });

  test("renders count of 1 after clicking the increment button", async () => {
    // Setup user interaction
    user.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });

    await user.click(incrementButton);
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("1");
  });

  test("renders count of 2 after clicking the increment button twice", async () => {
    user.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });

    await user.dblClick(incrementButton);
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("2");
  });
});

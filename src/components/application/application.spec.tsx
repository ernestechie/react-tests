import { render, screen } from "@testing-library/react";
import Application from "./application";

describe("Application", () => {
  test("renders correctly", () => {
    render(<Application />);

    const pageHeading = screen.getByRole("heading", {
      level: 1,
      name: /job application form/i, // Using case insensitive regex
    });
    expect(pageHeading).toBeInTheDocument();

    const subHeading = screen.getByRole("heading", {
      level: 2,
      name: /section 1/i,
    });
    expect(subHeading).toBeInTheDocument();

    const nameElement = screen.getByRole("textbox", {
      name: "name",
    });
    expect(nameElement).toBeInTheDocument();

    const bioElement = screen.getByRole("textbox", {
      name: "bio",
    });
    expect(bioElement).toBeInTheDocument();

    const jobLocationElement = screen.getByRole("combobox");
    expect(jobLocationElement).toBeInTheDocument();

    const termConditionsElement = screen.getByRole("combobox");
    expect(termConditionsElement).toBeInTheDocument();

    const submitButtonElement = screen.getByRole("button");
    expect(submitButtonElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText("Name", {
      selector: "input",
    });
    expect(nameElement2).toBeInTheDocument();

    const termConditionsElement2 = screen.getByLabelText((content) =>
      content?.toLowerCase()?.includes("terms and conditions")
    );
    expect(termConditionsElement2).toBeInTheDocument();

    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();
  });
});

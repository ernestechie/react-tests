import { logRoles, render, screen } from "@testing-library/react";
import { Skills } from "./skills";

describe("Skills", () => {
  const skills = ["React", "NextJS", "Typescript"];

  //
  test("renders correctly", () => {
    render(<Skills skills={skills} />);

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  //
  test("renders a list of skills", () => {
    render(<Skills skills={skills} />);

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(skills.length);
  });

  //
  test("renders login button", () => {
    render(<Skills skills={skills} />);

    // getByRole: Returns an error if element is not found
    const loginButton = screen.getByRole("button", {
      name: /Login/i,
    });
    expect(loginButton).toBeInTheDocument();
  });

  //
  test("Start Learning button is not rendered", () => {
    render(<Skills skills={skills} />);

    // queryByRole: Does not return an error if element is not found
    const startLearningButton = screen.queryByRole("button", {
      name: /Start Learning/i,
    });
    expect(startLearningButton).not.toBeInTheDocument();
  });

  //
  test("Start Learning button is eventually displayed", async () => {
    // const view =
    render(<Skills skills={skills} />);

    // logRoles(view.container);
    // screen.debug();
    // findByRole: Uses async & await, default timeout if 1000ms
    const startLearningButton = await screen.findByRole(
      "button",
      {
        name: "Start learning",
      },
      {
        timeout: 2000,
      }
    );
    // logRoles(view.container);
    // screen.debug();
    expect(startLearningButton).toBeInTheDocument();
  });
});

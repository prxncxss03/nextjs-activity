import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Activity1 from "../page";

describe("Activity1", () => {
  it("renders a heading", () => {
    render(<Activity1 />);
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("renders the correct heading", () => {
    render(<Activity1 />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Hello World");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Hello there</Button>);
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Hello there</Button>);
    
    await userEvent.click(screen.getByText("Hello there"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Hello there</Button>);
    expect(screen.getByText("Hello there")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Hello there</Button>);
    
    await userEvent.click(screen.getByText("Hello there"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});


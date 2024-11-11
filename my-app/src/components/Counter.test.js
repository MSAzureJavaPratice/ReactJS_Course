import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("renders initial value provided in props", () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText("Count: 10")).toBeInTheDocument();
  });

  test('decrements the displayed value on "decrement" button click', () => {
    render(<Counter initialValue={10} />);
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: 9")).toBeInTheDocument();
  });

  test('increments the displayed value on "increment" button click', () => {
    render(<Counter initialValue={10} />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 11")).toBeInTheDocument();
  });
});

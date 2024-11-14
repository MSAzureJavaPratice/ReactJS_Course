import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm Component", () => {
  test("renders an input with initial value from props", () => {
    render(<SearchForm initialQuery="test query" />);
    expect(screen.getByPlaceholderText("Search...").value).toBe("test query");
  });

  test("calls onSearch prop with the correct value on Submit button click", () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearchMock} />);

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "new query" },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(onSearchMock).toHaveBeenCalledWith("new query");
  });

  test("calls onSearch prop with the correct value on Enter key press", () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearchMock} />);

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "new query" },
    });
    fireEvent.keyPress(screen.getByPlaceholderText("Search..."), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(onSearchMock).toHaveBeenCalledWith("new query");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortControl from "./SortControl";

describe("SortControl Component", () => {
  const onSortChange = jest.fn();

  test("renders sort control correctly", () => {
    render(
      <SortControl currentSort="releaseDate" onSortChange={onSortChange} />
    );
    expect(screen.getByLabelText("Sort by:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Release Date")).toBeInTheDocument();
  });

  test("calls onSortChange when selecting a new option", () => {
    render(
      <SortControl currentSort="releaseDate" onSortChange={onSortChange} />
    );
    fireEvent.change(screen.getByLabelText("Sort by:"), {
      target: { value: "title" },
    });
    expect(onSortChange).toHaveBeenCalledWith("title");
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <SortControl currentSort="releaseDate" onSortChange={onSortChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

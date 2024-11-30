import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddMovie from "./AddMovie";

describe("AddMovie Component", () => {
  let setMovies, setIsDialogOpen, setDialogTitle, setDialogContent;
  const mockMovies = [{ id: 1, name: "Old Movie", releaseYear: "2010" }];

  beforeEach(() => {
    setMovies = jest.fn();
    setIsDialogOpen = jest.fn();
    setDialogTitle = jest.fn();
    setDialogContent = jest.fn();
    render(
      <AddMovie
        movies={mockMovies}
        setMovies={setMovies}
        setIsDialogOpen={setIsDialogOpen}
        setDialogTitle={setDialogTitle}
        setDialogContent={setDialogContent}
      />
    );
  });

  test("should render add movie button", () => {
    expect(
      screen.getByRole("button", { name: /add new movie/i })
    ).toBeInTheDocument();
  });

  test("should open dialog with form on button click", () => {
    fireEvent.click(screen.getByRole("button", { name: /add new movie/i }));

    expect(setIsDialogOpen).toHaveBeenCalledWith(true);
    expect(setDialogTitle).toHaveBeenCalledWith("Add New Movie");
    expect(setDialogContent).toHaveBeenCalled();
    expect(setDialogContent.mock.calls[0][0].type.name).toBe("MovieForm");
  });
});

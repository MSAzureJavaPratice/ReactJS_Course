import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DeleteMovie from "./DeleteMovie";

describe("DeleteMovie Component", () => {
  const mockMovie = { id: 3, name: "Movie to Delete", releaseYear: "2012" };
  let setMovies, onClose, setSelectedMovie;

  beforeEach(() => {
    setMovies = jest.fn();
    onClose = jest.fn();
    setSelectedMovie = jest.fn();
    render(
      <DeleteMovie
        movie={mockMovie}
        setMovies={setMovies}
        onClose={onClose}
        setSelectedMovie={setSelectedMovie}
      />
    );
  });

  test("should render delete confirmation and buttons", () => {
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});

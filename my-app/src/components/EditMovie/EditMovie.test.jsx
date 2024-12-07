import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditMovie from "./EditMovie";

jest.mock('axios', () => ({
  create: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
  // Add other mocked methods as necessary
}));

describe("EditMovie Component", () => {
  let setMovies, onClose, setSelectedMovie;
  const mockMovie = { id: 2, name: "Existing Movie", releaseYear: "2014" };

  beforeEach(() => {
    setMovies = jest.fn();
    onClose = jest.fn();
    setSelectedMovie = jest.fn();
    render(
      <EditMovie
        movie={mockMovie}
        setMovies={setMovies}
        onClose={onClose}
        setSelectedMovie={setSelectedMovie}
      />
    );
  });

  test("should render edit movie form", () => {
    const { container } = render(
      <EditMovie
        movie={mockMovie}
        setMovies={setMovies}
        onClose={onClose}
        setSelectedMovie={setSelectedMovie}
      />
    );
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });
});

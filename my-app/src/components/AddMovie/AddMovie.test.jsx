import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddMovie from "./AddMovie";
import movieService from "../../service/movieService";

jest.mock("axios", () => ({
  create: jest.fn().mockResolvedValue({ data: "Mocked data" }),
}));

jest.mock("../../service/movieService"); // Correct setup for mocking

describe("AddMovie Component", () => {
  const onClose = jest.fn();
  const onMovieAdded = jest.fn();
  const setAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <AddMovie
        onClose={onClose}
        onMovieAdded={onMovieAdded}
        setAlert={setAlert}
      />
    );
  });

  test("should render the movie form", () => {
    // Ensure the form is rendered correctly
    expect(screen.getByTestId("movie-form")).toBeInTheDocument();
  });

  test("should submit form and trigger callbacks", async () => {
    const mockMovie = {
      id: 1,
      title: "New Movie",
      release_date: "2022-01-01",
      runtime: 120,
      vote_average: 7.5,
      poster_path: "http://example.com/poster.jpg",
      overview: "A great movie!",
      genres: ["Action"], // Make sure at least one genre is selected
    };

    movieService.createMovie.mockResolvedValue(mockMovie);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Movie" },
    });
    fireEvent.change(screen.getByLabelText(/release date/i), {
      target: { value: "2022-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/runtime \(minutes\)/i), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText(/rating/i), {
      target: { value: "7.5" },
    });
    fireEvent.change(screen.getByLabelText(/poster url/i), {
      target: { value: "http://example.com/poster.jpg" },
    });
    fireEvent.change(screen.getByLabelText(/overview/i), {
      target: { value: "A great movie!" },
    });

    // Select a genre (e.g., Action)
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: "Action" },
    });

    // Simulate form submission
    fireEvent.submit(screen.getByTestId("movie-form"));

    // Wait for the callbacks to be triggered
    await waitFor(() => {
      expect(onMovieAdded).toHaveBeenCalledWith(mockMovie);
      expect(onClose).toHaveBeenCalled();
      expect(setAlert).toHaveBeenCalledWith({
        type: "success",
        message: "Movie added successfully!",
      });
    });
  });

  test("handles submission errors", async () => {
    const errorMessage = "Failed to add movie. Please try again.";
    movieService.createMovie.mockRejectedValue(new Error(errorMessage));

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Movie" },
    });
    fireEvent.change(screen.getByLabelText(/release date/i), {
      target: { value: "2022-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/runtime \(minutes\)/i), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText(/rating/i), {
      target: { value: "7.5" },
    });
    fireEvent.change(screen.getByLabelText(/poster url/i), {
      target: { value: "http://example.com/poster.jpg" },
    });
    fireEvent.change(screen.getByLabelText(/overview/i), {
      target: { value: "A great movie!" },
    });

    // Select a genre (e.g., Action)
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: "Action" },
    });

    // Simulate form submission
    fireEvent.submit(screen.getByTestId("movie-form"));

    // Wait for the error handling
    await waitFor(() => {
      expect(setAlert).toHaveBeenCalledWith({
        type: "error",
        message: errorMessage,
      });
    });
  });
});

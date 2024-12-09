import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddMovie from "./AddMovie";
import movieService from "../../service/movieService";

jest.mock('axios', () => ({
  create: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
  // Add other mocked methods as necessary
}));

jest.mock('../../service/movieService');  // Correct setup for mocking

describe("AddMovie Component", () => {
  const onClose = jest.fn();
  const onMovieAdded = jest.fn();
  const setAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(<AddMovie onClose={onClose} onMovieAdded={onMovieAdded} setAlert={setAlert} />);
  });

  test("should render the movie form", () => {
    expect(screen.getByTestId("movie-form")).toBeInTheDocument();
  });

  test("should submit form and trigger callbacks", async () => {
    const mockMovie = { id: 1, title: 'New Movie' };
    movieService.createMovie.mockResolvedValue(mockMovie);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Movie' } });
    fireEvent.change(screen.getByLabelText(/release date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/runtime \(minutes\)/i), { target: { value: '120' } });  
    fireEvent.submit(screen.getByTestId("movie-form"));

    await waitFor(() => {
      expect(onMovieAdded).toHaveBeenCalledWith(mockMovie);
      expect(onClose).toHaveBeenCalled();
      expect(setAlert).toHaveBeenCalledWith({
        type: "success",
        message: "Movie added successfully!"
      });
    });
  });

  test("handles submission errors", async () => {
    const errorMessage = "Failed to add movie. Please try again.";
    movieService.createMovie.mockRejectedValue(new Error(errorMessage));
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Movie' } });
    fireEvent.change(screen.getByLabelText(/release date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/runtime \(minutes\)/i), { target: { value: '120' } });  
    fireEvent.submit(screen.getByTestId("movie-form"));

    await waitFor(() => {
      expect(setAlert).toHaveBeenCalledWith({
        type: "error",
        message: errorMessage
      });
    });
  });
});
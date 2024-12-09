import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import DeleteMovie from "./DeleteMovie";
import movieService from "../../service/movieService";

// Properly mock the movieService that is used in the component
jest.mock('../../service/movieService', () => ({
    deleteMovie: jest.fn(),
}));

describe("DeleteMovie Component", () => {
  const mockMovie = { id: 3, title: "Movie to Delete", releaseYear: "2012" };
  const onMovieDeleted = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    render(
      <DeleteMovie
        movie={mockMovie}
        onMovieDeleted={onMovieDeleted}
        onClose={onClose}
      />
    );
  });

  test("should render delete confirmation and buttons", () => {
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByText(/movie to delete/i)).toBeInTheDocument(); // Check if the movie title is rendered properly
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument(); // Corrected to match button text
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument(); // Corrected to match button text
  });

  test("should handle delete on 'Yes' button click", async () => {
    // Mock the deleteMovie method to resolve immediately as it is an async action
    movieService.deleteMovie.mockResolvedValue({});

    fireEvent.click(screen.getByRole("button", { name: /yes/i }));
    
    await waitFor(() => {
      expect(onMovieDeleted).toHaveBeenCalled(); // Verify that deleting the movie triggers the onMovieDeleted callback
      expect(onClose).toHaveBeenCalled(); // Verify that the dialog is closed afterward
    });
  });

  test("should handle dialog close on 'No' button click", () => {
    fireEvent.click(screen.getByRole("button", { name: /no/i }));
    expect(onClose).toHaveBeenCalled(); // Verify that the onClose method is called when clicking 'No'
  });
});
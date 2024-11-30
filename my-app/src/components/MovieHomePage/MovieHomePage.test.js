import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieHomePage from "./MovieHomePage";

describe("MovieHomePage Component", () => {
  test("renders MovieHomePage layout with movie details and list", () => {
    const movieDetails = screen.getByTestId("movie-details"); // Use a unique test id
    expect(within(movieDetails).getByText("Inception")).toBeInTheDocument();

    const movieList = screen.getByTestId("movie-list"); // Use another test id
    const movieTiles = within(movieList).getAllByText("Inception");
    expect(movieTiles.length).toBeGreaterThan(0); // Ensure it exists in the list
  });

  test("updates movie details when a movie is clicked", () => {
    render(<MovieHomePage />);

    fireEvent.click(screen.getByText("Interstellar"));
    expect(screen.getByText("Rating: 8.6/10")).toBeInTheDocument();
    expect(
      screen.getByText("A team of explorers travel through a wormhole...")
    ).toBeInTheDocument();
  });

  test("sorts movie list when sort option is changed", () => {
    render(<MovieHomePage />);

    fireEvent.change(screen.getByLabelText("Sort by:"), {
      target: { value: "title" },
    });
    const tiles = screen.getAllByText(/Release Year:/);
    expect(tiles[0]).toHaveTextContent("Inception");
    expect(tiles[1]).toHaveTextContent("Interstellar");
    expect(tiles[2]).toHaveTextContent("The Dark Knight");
  });
});

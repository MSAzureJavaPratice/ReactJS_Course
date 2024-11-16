import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";

describe("MovieDetails Component", () => {
  const mockMovie = {
    imageUrl: "https://via.placeholder.com/150",
    name: "Inception",
    releaseYear: "2010",
    rating: "8.8/10",
    duration: "148 minutes",
    description: "A thief who steals corporate secrets...",
  };

  test("renders movie details correctly", () => {
    render(<MovieDetails movie={mockMovie} />);

    // Check for rendered content
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Rating: 8.8/10")).toBeInTheDocument();
    expect(screen.getByText("Duration: 148 minutes")).toBeInTheDocument();
    expect(
      screen.getByText("A thief who steals corporate secrets...")
    ).toBeInTheDocument();
  });

  test("renders movie image with correct alt text", () => {
    render(<MovieDetails movie={mockMovie} />);
    const img = screen.getByAltText("Inception");
    expect(img).toHaveAttribute("src", mockMovie.imageUrl);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieDetails movie={mockMovie} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

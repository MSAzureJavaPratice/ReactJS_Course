import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter to wrap the component
import MovieDetails from "./MovieDetails";

// Mocking axios if necessary (you can skip this if not using axios directly)
jest.mock("axios", () => ({
  create: jest.fn().mockResolvedValue({ data: "Mocked data" }),
}));

describe("MovieDetails Component", () => {
  const mockMovie = {
    poster_path: "https://via.placeholder.com/150",
    title: "Inception",
    release_date: "2010",
    vote_average: "8.8",
    runtime: "148",
    overview: "A thief who steals corporate secrets...",
  };

  it("renders movie details correctly", () => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component with BrowserRouter */}{" "}
        <MovieDetails movie={mockMovie} />{" "}
      </BrowserRouter>
    );

    // Updated expectations to match the rendered output of the component
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Release Date: 2010")).toBeInTheDocument();
    expect(screen.getByText("Rating: 8.8")).toBeInTheDocument();
    expect(screen.getByText("Runtime: 148 minutes")).toBeInTheDocument();
    expect(
      screen.getByText("A thief who steals corporate secrets...")
    ).toBeInTheDocument();
  });

  it("renders movie image with correct alt text and src", () => {
    render(
      <BrowserRouter>
        <MovieDetails movie={mockMovie} />{" "}
      </BrowserRouter>
    );
    const img = screen.getByAltText("Inception");
    expect(img).toHaveAttribute("src", mockMovie.poster_path);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <MovieDetails movie={mockMovie} />{" "}
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

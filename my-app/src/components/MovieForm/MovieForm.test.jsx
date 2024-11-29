import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("");
    expect(screen.getByLabelText("Genre:")).toHaveValue([]); // Expect empty array for multiple selection.
    expect(screen.getByLabelText("Description:")).toHaveValue("");
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      title: "Inception",
      releaseYear: "2010",
      genres: ["Sci-Fi"],
      description: "A movie about dreams.",
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("2010");
    expect(screen.getByLabelText("Genre:")).toHaveValue(["Sci-Fi"]); // Expect array for multiple selection.
    expect(screen.getByLabelText("Description:")).toHaveValue("A movie about dreams.");
  });

  test("calls onSubmit with form data when submitted", () => {
    const initialMovieInfo = {
      title: "Matrix",
      releaseYear: "1999",
      genres: ["Action"],
      description: "A movie about virtual reality.",
    };
    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />);

    // Trigger form submission
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: null,
      title: "Matrix",
      releaseYear: "1999",
      selectedGenres: ["Action"], // Match the correct state property.
      description: "A movie about virtual reality.",
      duration: "",
      rating: "",
      imageUrl: "",
    });
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieForm onSubmit={onSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("");
    expect(screen.getByLabelText("Genre:")).toHaveValue([]); // Expect empty array for multiple selection
    expect(screen.getByLabelText("Description:")).toHaveValue("");
    expect(screen.getByLabelText("Duration:")).toHaveValue("");
    expect(screen.getByLabelText("Rating:")).toHaveValue("");
    expect(screen.getByLabelText("Image URL:")).toHaveValue("");
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      id: 1,
      name: "Inception",
      releaseYear: "2010",
      genres: ["Sci-Fi", "Action"],
      description: "A movie about dreams.",
      duration: "148",
      rating: "8.8",
      imageUrl: "https://example.com/inception.jpg",
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("2010");
    expect(screen.getByLabelText("Genre:")).toHaveValue(["Sci-Fi", "Action"]);
    expect(screen.getByLabelText("Description:")).toHaveValue("A movie about dreams.");
    expect(screen.getByLabelText("Duration:")).toHaveValue("148");
    expect(screen.getByLabelText("Rating:")).toHaveValue("8.8");
    expect(screen.getByLabelText("Image URL:")).toHaveValue("https://example.com/inception.jpg");
  });

  test("calls onSubmit with form data when submitted", () => {
    const initialMovieInfo = {
      id: 1,
      name: "Matrix",
      releaseYear: "1999",
      genres: ["Action"],
      description: "A movie about virtual reality.",
      duration: "136",
      rating: "8.7",
      imageUrl: "https://example.com/matrix.jpg",
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />);

    // Simulate changes
    fireEvent.change(screen.getByLabelText("Title:"), { target: { value: "Matrix Reloaded" } });
    fireEvent.change(screen.getByLabelText("Release Year:"), { target: { value: "2003" } });
    fireEvent.change(screen.getByLabelText("Rating:"), { target: { value: "8.5" } });

    // Trigger form submission
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: 1,
      name: "Matrix Reloaded",
      releaseYear: "2003",
      genres: ["Action"], // Unchanged genres
      description: "A movie about virtual reality.",
      duration: "136",
      rating: "8.5",
      imageUrl: "https://example.com/matrix.jpg",
    });
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieForm onSubmit={onSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

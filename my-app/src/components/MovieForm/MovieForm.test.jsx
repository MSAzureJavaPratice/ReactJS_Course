import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("");
    expect(screen.getByLabelText("Release Date:")).toHaveValue(""); // Fixed label text
    expect(screen.getByLabelText("Genre:")).toHaveValue([]); // For multi-select, it should be an empty array
    expect(screen.getByLabelText("Overview:")).toHaveValue(""); // Corrected description to overview
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      title: "Inception",
      release_date: "2010-07-16", // Correct the date format
      genres: ["Sci-Fi"], // Ensure this is an array since it's a multi-select
      overview: "A movie about dreams.",
    };

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );
    expect(screen.getByLabelText("Title:")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release Date:")).toHaveValue("2010-07-16");
    expect(screen.getByLabelText("Genre:")).toHaveValue(["Sci-Fi"]); // For multi-select, check the set values
    expect(screen.getByLabelText("Overview:")).toHaveValue(
      "A movie about dreams."
    );
  });

  test("calls onSubmit with form data when submitted", () => {
    const initialMovieInfo = {
      title: "Inception",
      release_date: "2010-07-16",
      genres: ["Sci-Fi"],
      overview: "A movie about dreams.",
    };

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );

    // Correctly handling numeric inputs to prevent NaN
    fireEvent.change(screen.getByLabelText("Runtime (minutes):"), {
      target: { value: "148" }, // Provide some numeric value
    });

    fireEvent.change(screen.getByLabelText("Rating:"), {
      target: { value: "8.8" }, // Provide some numeric value
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    // Ensure that the expected object aligns with the initial values plus any manual changes done in test
    expect(onSubmit).toHaveBeenCalledWith({
      id: "",
      title: "Inception",
      release_date: "2010-07-16",
      genres: ["Sci-Fi"],
      overview: "A movie about dreams.",
      runtime: 148,
      vote_average: 8.8,
      poster_path: "", // Assuming default or empty values are ""
    });
  });
});

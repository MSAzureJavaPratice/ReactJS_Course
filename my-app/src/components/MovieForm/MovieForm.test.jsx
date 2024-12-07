import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("");
    expect(screen.getByLabelText("Release Date:")).toHaveValue("");
    expect(screen.getByLabelText("Genre:")).toHaveValue("");
    expect(screen.getByLabelText("Overview:")).toHaveValue("");
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      title: "Inception",
      release_date: "2010-07-16",
      genres: ["Sci-Fi", "Thriller"],
      runtime: "148",
      overview: "A movie about dreams.",
      vote_average: "8.8",
      poster_path: "https://example.com/inception.jpg",
    };

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );
    expect(screen.getByLabelText("Title:")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release Date:")).toHaveValue("2010-07-16");
    expect(screen.getByLabelText("Genre:")).toHaveValue(["Sci-Fi", "Thriller"]);
    expect(screen.getByLabelText("Overview:")).toHaveValue(
      "A movie about dreams."
    );
  });

  test("calls onSubmit with form data when submitted", () => {
    render(<MovieForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "Matrix" },
    });
    fireEvent.change(screen.getByLabelText("Release Date:"), {
      target: { value: "1999-03-31" },
    });
    fireEvent.change(screen.getByLabelText("Genre:"), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText("Overview:"), {
      target: { value: "A movie about virtual reality." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      title: "Matrix",
      release_date: "1999-03-31",
      genres: ["Action"],
      runtime: 0,
      overview: "A movie about virtual reality.",
      vote_average: 0,
      poster_path: "",
    });
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieForm onSubmit={onSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

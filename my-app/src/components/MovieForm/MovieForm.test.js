import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("Title:")).toHaveValue("");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("");
    expect(screen.getByLabelText("Genre:")).toHaveValue("");
    expect(screen.getByLabelText("Description:")).toHaveValue("");
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      title: "Inception",
      releaseYear: "2010",
      genre: "Sci-Fi",
      description: "A movie about dreams.",
    };

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );
    expect(screen.getByLabelText("Title:")).toHaveValue("Inception");
    expect(screen.getByLabelText("Release Year:")).toHaveValue("2010");
    expect(screen.getByLabelText("Genre:")).toHaveValue("Sci-Fi");
    expect(screen.getByLabelText("Description:")).toHaveValue(
      "A movie about dreams."
    );
  });

  test("calls onSubmit with form data when submitted", () => {
    render(<MovieForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Title:"), {
      target: { value: "Matrix" },
    });
    fireEvent.change(screen.getByLabelText("Release Year:"), {
      target: { value: "1999" },
    });
    fireEvent.change(screen.getByLabelText("Genre:"), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText("Description:"), {
      target: { value: "A movie about virtual reality." },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      title: "Matrix",
      releaseYear: "1999",
      genre: "Action",
      description: "A movie about virtual reality.",
    });
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieForm onSubmit={onSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

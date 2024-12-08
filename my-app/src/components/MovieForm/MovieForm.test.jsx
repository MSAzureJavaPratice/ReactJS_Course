import { render, screen, fireEvent, act } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const mockOnSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty form when no initialMovieInfo is provided", () => {
    render(<MovieForm onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId("title")).toHaveValue("");
    expect(screen.getByTestId("release_date")).toHaveValue("");
    expect(screen.getByTestId("genres")).toHaveValue([]);
  });

  test("renders form with initial values when initialMovieInfo is provided", () => {
    const initialMovieInfo = {
      title: "Inception",
      release_date: "2010-07-16",
      genres: ["Action", "Sci-Fi"],
      runtime: 148,
      overview: "A mind-bending thriller.",
      vote_average: 8.8,
      poster_path: "https://example.com/inception.jpg",
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId("title")).toHaveValue("Inception");
    expect(screen.getByTestId("release_date")).toHaveValue("2010-07-16");
    expect(screen.getByTestId("genres").selectedOptions.length).toBe(2);
    expect(screen.getByTestId("runtime")).toHaveValue(148);
    expect(screen.getByTestId("overview")).toHaveValue("A mind-bending thriller.");
    expect(screen.getByTestId("vote_average")).toHaveValue(8.8);
    expect(screen.getByTestId("poster_path")).toHaveValue("https://example.com/inception.jpg");
  });

  it("calls onSubmit with form data when submitted", async () => {
    const initialMovieInfo = {
      title: "Inception",
      release_date: "2010-07-16",
      genres: ["Sci-Fi", "Thriller"],
      runtime: 148,
      overview: "A mind-bending thriller.",
      vote_average: 8.8,
      poster_path: "https://example.com/inception.jpg",
    };

    render(<MovieForm initialMovieInfo={initialMovieInfo} onSubmit={mockOnSubmit} />);

    // Fill out required fields
    fireEvent.change(screen.getByTestId("title"), {
      target: { value: "Inception" },
    });
    fireEvent.change(screen.getByTestId("runtime"), {
      target: { value: "148" },
    });

    // Wrap form submission in `act()`
    await act(async () => {
      fireEvent.submit(screen.getByTestId("movie-form"));
    });

    // Ensure onSubmit is called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Inception",
        runtime: 148,
      })
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<MovieForm onSubmit={mockOnSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

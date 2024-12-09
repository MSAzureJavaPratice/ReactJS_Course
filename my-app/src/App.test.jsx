import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { act } from "react";
import axios from "axios";
import MovieHomePage from "./components/MovieHomePage/MovieHomePage";

// Properly mock axios methods
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    // Mock the API response for axios.get
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Sample Movie",
          genre: "Action",
          releaseDate: "2023-12-01",
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("renders MovieHomePage component and expects to find an Add Movie button", async () => {
    await act(async () => {
      render(<App />);
    });

    const addMovieButton = screen.getByRole("button", { name: /add movie/i });
    expect(addMovieButton).toBeInTheDocument();
  });

  test("searches movies on form submission", async () => {
    await act(async () => {
      render(<App />);
    });

    const input = screen.getByPlaceholderText(/what do you want to watch?/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "Some Movie");
    await userEvent.click(searchButton);

    expect(input).toHaveValue("Some Movie");
  });
});

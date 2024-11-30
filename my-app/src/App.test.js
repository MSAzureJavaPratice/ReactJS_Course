import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    test("renders Counter component title", () => {
        render( < App / > );
        const counterTitle = screen.getByText(/Counter Component/i);
        expect(counterTitle).toBeInTheDocument();
    });

    test("renders SearchForm component title", () => {
        render( < App / > );
        const searchFormTitle = screen.getByText(/Search Form Component/i);
        expect(searchFormTitle).toBeInTheDocument();
    });

    test("renders GenreSelect component title", () => {
        render( < App / > );
        const genreSelectTitle = screen.getByText(/Genre Select Component/i);
        expect(genreSelectTitle).toBeInTheDocument();
    });

    test("renders initial selected genre", () => {
        render( < App / > );
        const selectedGenreText = screen.getByText(/Selected Genre: Action/i);
        expect(selectedGenreText).toBeInTheDocument();
    });

    test("updates selected genre on button click", () => {
        render( < App / > );
        const comedyButton = screen.getByText(/Comedy/i);
        fireEvent.click(comedyButton);
        const updatedGenreText = screen.getByText(/Selected Genre: Comedy/i);
        expect(updatedGenreText).toBeInTheDocument();
    });

    test("updates search query on form submission", () => {
        render( < App / > );

        // Find the input and search button
        const input = screen.getByPlaceholderText(/Search.../i);
        const searchButton = screen.getByRole("button", { name: /Search/i });

        // Simulate user interaction
        fireEvent.change(input, { target: { value: "React Testing" } });
        fireEvent.click(searchButton);

        // Assert that the query is displayed
        const searchResultText = screen.getByText(/Search Query: React Testing/i);
        expect(searchResultText).toBeInTheDocument();
    });


    test("increments and decrements the counter", () => {
        render( < App / > );
        const incrementButton = screen.getByText(/Increment/i);
        const decrementButton = screen.getByText(/Decrement/i);
        const countValue = screen.getByText(/Count: 0/i);

        // Increment
        fireEvent.click(incrementButton);
        expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();

        // Decrement
        fireEvent.click(decrementButton);
        expect(countValue).toBeInTheDocument(); // back to Count: 0
    });
});
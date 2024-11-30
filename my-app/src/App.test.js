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
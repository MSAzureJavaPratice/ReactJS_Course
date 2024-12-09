import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieHomePage from "./MovieHomePage";
import movieService from "../../service/movieService";

jest.mock('../../service/movieService', () => ({
    getMovies: jest.fn(),
}));;

jest.mock('axios', () => ({
    create: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
    // Add other mocked methods as necessary
}));

const mockMovies = [
    { id: 1, title: "Inception", release_date: "2010", genres: ['Sci-Fi'] },
    { id: 2, title: "Interstellar", release_date: "2014", genres: ['Sci-Fi'] },
    { id: 3, title: "The Dark Knight", release_date: "2008", genres: ['Action'] }
];

describe("MovieHomePage Component", () => {
    beforeEach(() => {
        movieService.getMovies.mockResolvedValue({ data: mockMovies });
    });

    test("renders MovieHomePage layout with movie details and list", async() => {
        render( < MovieHomePage / > );
        await waitFor(() => {
            const movieTiles = screen.getAllByText(/Inception/i); // Check if "Inception" is rendered
            expect(movieTiles.length).toBeGreaterThan(0);
        });
    });

    test("updates movie details when a movie is clicked", async() => {
        render( < MovieHomePage / > );
        await waitFor(() => {
            const movieButton = screen.getByText("Interstellar");
            fireEvent.click(movieButton);
            expect(screen.getByText("Release Date: 2014")).toBeInTheDocument(); // Validate the year shown for Interstellar assuming 'Release Date:' is a text you display
        });
    });

    test("sorts movie list when sort option is changed", async() => {
        render( < MovieHomePage / > );

        // We expect the sort-by select to have a real interaction effect checked.
        const sortBySelect = await screen.findByLabelText("Sort by:");

        // Triggering change event on sortBy Select with value that corresponds to sorting by title
        fireEvent.change(sortBySelect, { target: { value: "title" } });

        // Waiting for the expected sorted order of titles
        await waitFor(() => {
            const sortedMovies = screen.getAllByTestId("movie-title"); // Assuming you add `data-testid="movie-title"` to your movie title elements
            expect(sortedMovies[0]).toHaveTextContent("Inception");
            expect(sortedMovies[1]).toHaveTextContent("Interstellar");
            expect(sortedMovies[2]).toHaveTextContent("The Dark Knight");
        });
    });
});
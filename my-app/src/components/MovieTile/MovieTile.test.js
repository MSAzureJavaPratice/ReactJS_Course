import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieTile from "./MovieTile";

describe("MovieTile Component", () => {
    const mockMovie = {
        imageUrl: "https://via.placeholder.com/150",
        name: "Inception",
        releaseYear: "2010",
        genres: ["Sci-Fi", "Thriller"],
    };
    const onClick = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders movie tile correctly", () => {
        render( <
            MovieTile movie = { mockMovie }
            onClick = { onClick }
            onEdit = { onEdit }
            onDelete = { onDelete }
            />
        );

        // Check for movie name, year, and genres
        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("2010")).toBeInTheDocument();
        expect(screen.getByText("Sci-Fi, Thriller")).toBeInTheDocument();

        // Check if the image is rendered with correct alt text
        const image = screen.getByAltText("Inception");
        expect(image).toHaveAttribute("src", mockMovie.imageUrl);
    });

    test("calls onClick when clicked", () => {
        render( <
            MovieTile movie = { mockMovie }
            onClick = { onClick }
            onEdit = { onEdit }
            onDelete = { onDelete }
            />
        );

        fireEvent.click(screen.getByText("Inception"));
        expect(onClick).toHaveBeenCalledWith(mockMovie);
    });

    test("shows and hides menu when clicking dots", () => {
        render( <
            MovieTile movie = { mockMovie }
            onClick = { onClick }
            onEdit = { onEdit }
            onDelete = { onDelete }
            />
        );

        const menuButton = screen.getByText("...");
        fireEvent.click(menuButton);

        // Verify menu items are displayed
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();

        // Click the dots again to hide the menu
        fireEvent.click(menuButton);
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });
});
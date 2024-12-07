import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieTile from "./MovieTile";

describe("MovieTile Component", () => {
    const mockMovie = {
        poster_path: "https://via.placeholder.com/150",
        title: "Inception",
        release_date: "2010-07-16",
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

        // Check for movie title, year, and genres
        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("2010")).toBeInTheDocument();
        expect(screen.getByText("Sci-Fi, Thriller")).toBeInTheDocument();

        // Check if the image is rendered with correct attributes
        const image = screen.getByAltText("Inception");
        expect(image).toHaveAttribute("src", mockMovie.poster_path);
    });

    test("calls onClick when clicked", () => {
        render( <
            MovieTile movie = { mockMovie }
            onClick = { onClick }
            onEdit = { onEdit }
            onDelete = { onDelete }
            />
        );

        // Simulate a click event on the movie component
        fireEvent.click(screen.getByAltText("Inception"));
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

    test("calls onEdit and onDelete callbacks", () => {
        render( <
            MovieTile movie = { mockMovie }
            onClick = { onClick }
            onEdit = { onEdit }
            onDelete = { onDelete }
            />
        );

        fireEvent.click(screen.getByText("..."));

        // Trigger Edit
        fireEvent.click(screen.getByText("Edit"));
        expect(onEdit).toHaveBeenCalledWith(mockMovie);

        // Trigger Delete
        fireEvent.click(screen.getByText("Delete"));
        expect(onDelete).toHaveBeenCalledWith(mockMovie);
    });
});
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Main from "./MovieHomePage";

describe("Main Component", () => {
    test("renders initially with the first movie's details", () => {
        const { getByText } = render( < Main / > );
        expect(getByText("Interstellar")).toBeInTheDocument(); // Checks for first movie's display
        expect(getByText("2014")).toBeInTheDocument(); // Inception's duration
    });

    test("updates movie details when a different movie is clicked", () => {
        const { getByText } = render( < Main / > );

        fireEvent.click(getByText("Interstellar"));
        expect(
            getByText(
                "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
            )
        ).toBeInTheDocument();
    });

    test("sorts movie list when sort option is changed", () => {
        render( < Main / > );

        // Change the sort option to 'title', which is a valid sort key according to the <select> options
        fireEvent.change(screen.getByLabelText("Sort by:"), {
            target: { value: "title" }
        });

        // Assuming each title is within an element having 'movie-tile__title' class
        const movieTitles = screen.getAllByText((content, element) =>
            element.className === 'movie-tile__title');

        // Trim the whitespace around the text content before comparison
        expect(movieTitles[0].textContent.trim()).toBe("Inception");
        expect(movieTitles[1].textContent.trim()).toBe("Interstellar");
        expect(movieTitles[2].textContent.trim()).toBe("The Dark Knight");
    });
});
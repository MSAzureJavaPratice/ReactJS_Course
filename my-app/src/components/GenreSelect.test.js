import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

describe("GenreSelect Component", () => {
    const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

    test("renders all genres passed in props", () => {
        render( < GenreSelect genres = { genres }
            selectedGenre = "" / > );
        genres.forEach((genre) => {
            expect(screen.getByText(genre)).toBeInTheDocument();
        });
    });

    test("highlights the selected genre passed in props", () => {
        render( < GenreSelect genres = { genres }
            selectedGenre = "Comedy" / > );
        const selectedButton = screen.getByText("Comedy");
        expect(selectedButton).toHaveStyle("background-color: ButtonFace");
    });

    test("calls onSelect callback with correct genre on button click", () => {
        const onSelectMock = jest.fn();
        render( <
            GenreSelect genres = { genres }
            selectedGenre = ""
            onSelect = { onSelectMock }
            />
        );

        fireEvent.click(screen.getByText("Horror"));

        expect(onSelectMock).toHaveBeenCalledWith("Horror");
    });
});
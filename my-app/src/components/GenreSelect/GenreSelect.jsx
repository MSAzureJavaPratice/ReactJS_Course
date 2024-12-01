import React from "react";
import "./GenreSelect.css";

const GenreSelect = ({ genres, activeGenre, onGenreChange }) => {
  return (
    <div className="genre-select-container">
      {genres.map((genre) => (
        <div
          key={genre}
          className={`genre-option ${
            activeGenre === genre ? "active" : ""
          }`}
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default GenreSelect;

import React, { useState } from "react";
import "./GenreSelect.css"; // Import the CSS file for styling

const GenreSelect = ({ genres, selectedGenre = "", onSelect }) => {
  const [displayedGenre, setDisplayedGenre] = useState(selectedGenre);

  const handleGenreSelect = (genre) => {
    setDisplayedGenre(genre);
    if (onSelect) {
      onSelect(genre);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {" "}
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreSelect(genre)}
          className={genre === displayedGenre ? "selected" : ""}
        >
          {genre}{" "}
        </button>
      ))}{" "}
      <p id="selected-genre"> Selected Genre: {displayedGenre} </p>{" "}
    </div>
  );
};

export default GenreSelect;

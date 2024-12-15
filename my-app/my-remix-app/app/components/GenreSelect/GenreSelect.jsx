import React from 'react';
import "./GenreSelect.css";


const GenreSelect = ({ genres, activeGenre, searchParams }) => {
  // Retrieve all current search params, exclude 'genre'
  const currentParams = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'genre');

  return (
    <div className="genre-select-container">
      {genres.map(genre => (
        <form key={genre} action="/" method="GET" className="genre-form">
          {/* Propagate other parameters as hidden inputs */}
          {currentParams.map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          {/* Genre input */}
          <input
            type="hidden"
            name="genre"
            value={genre}
          />
          <input
            type="submit"
            value={genre}
            className={`genre-option ${activeGenre === genre ? 'active' : ''}`}
          />
        </form>
      ))}
    </div>
  );
};

export default GenreSelect;
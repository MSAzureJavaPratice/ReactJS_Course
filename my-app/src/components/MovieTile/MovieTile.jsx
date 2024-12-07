import React, { useState } from "react";
import "./MovieTile.css";

// MovieTile component
const MovieTile = ({ movie, onClick, onEdit, onDelete }) => {
  const { poster_path, title, release_date, genres } = movie;
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent click from triggering parent onClick
    setShowMenu((prev) => !prev);
  };

  const handleMenuItemClick = (action) => {
    setShowMenu(false);
    if (action === "edit") {
      onEdit(movie);
    } else if (action === "delete") {
      onDelete(movie);
    }
  };

  return (
    <div className="movie-tile" onClick={() => onClick(movie)}>
      <img src={poster_path} alt={title} className="movie-tile__image" />
      <div className="movie-tile__menu" onClick={handleMenuClick}>
        <button className="menu-button">...</button>
        {showMenu && (
          <div className="movie-tile__menu-dropdown">
            <button onClick={() => handleMenuItemClick("edit")}>Edit</button>
            <button onClick={() => handleMenuItemClick("delete")}>Delete</button>
          </div>
        )}
      </div>
      <div className="movie-tile__info">
        <div className="movie-tile__title" data-testid="movie-title">{title}</div>
        <div className="movie-tile__year">{release_date.split("-")[0]}</div>
        <div className="movie-tile__genres">{genres.join(", ")}</div>
      </div>
    </div>
  );
};

export default MovieTile;

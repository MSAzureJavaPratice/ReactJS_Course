import React from "react";
import movieService from "../../service/movieService";
import "./DeleteMovie.css";

const DeleteMovie = ({ movie, onClose, onMovieDeleted }) => {
  const handleDelete = async () => {
    try {
      await movieService.deleteMovie(movie.id);
      onMovieDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="delete-movie-dialog">
      <p>Are you sure you want to delete "{movie.title}"?</p>
      <div>
        <button className="delete-btn" onClick={handleDelete}>
          Yes
        </button>
        <button className="cancel-btn" onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteMovie;

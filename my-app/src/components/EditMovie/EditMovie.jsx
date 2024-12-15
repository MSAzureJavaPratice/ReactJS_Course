import React from "react";
import MovieForm from "../MovieForm/MovieForm";
import movieService from "../../service/movieService";

const EditMovie = ({ movie, onClose, onMovieUpdated, setAlert }) => {
  const handleSubmit = async (updatedMovie) => {
    try {
      const savedMovie = await movieService.updateMovie(updatedMovie);
      onMovieUpdated(savedMovie);
      onClose();
      setAlert({ type: "success", message: "Movie updated successfully!" });
    } catch (error) {
      console.error("Error editing movie:", error);
      setAlert({
        type: "error",
        message: "Failed to update movie. Please try again.",
      });
    }
  };

  return <MovieForm initialMovieInfo={movie} onSubmit={handleSubmit} />;
};

export default EditMovie;

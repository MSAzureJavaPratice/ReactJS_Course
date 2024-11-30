import React from "react";
import MovieForm from "../MovieForm/MovieForm";
import movieService from "../../service/movieService";
import "./AddMovie.css";

const AddMovie = ({ onClose, onMovieAdded, setAlert }) => {
  const handleSubmit = async (newMovie) => {
    try {
      const createdMovie = await movieService.createMovie(newMovie);
      onMovieAdded(createdMovie);
      onClose();
      setAlert({ type: "success", message: "Movie added successfully!" });
    } catch (error) {
      console.error("Error adding movie:", error);
      setAlert({ type: "error", message: "Failed to add movie. Please try again." });
    }
  };

  return (
    <MovieForm
      initialMovieInfo={{
        title: "",
        release_date: "",
        genres: [],
        poster_path: "",
        runtime: "",
        overview: "",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default AddMovie;

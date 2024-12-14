import React from "react";
import MovieForm from "../MovieForm/MovieForm";
import movieService from "../../service/movieService";
import "./AddMovie.css";

const AddMovie = ({ onClose, onMovieAdded, setAlert }) => {
  const handleSubmit = async (newMovie) => {
    try {
      const createdMovie = await movieService.createMovie(newMovie);
      onClose(); // Close the Add New Movie dialog immediately
      setAlert({ type: "success", message: "Movie added successfully!" });
      onMovieAdded(createdMovie); // Notify parent of the new movie
    } catch (error) {
      console.error("Error adding movie:", error);
      onClose(); // Close the Add New Movie dialog even on failure
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
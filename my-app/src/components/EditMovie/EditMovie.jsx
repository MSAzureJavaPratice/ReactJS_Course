import React from "react";
import MovieForm from "../MovieForm/MovieForm";

const EditMovie = ({
  movie,
  setMovies,
  onClose,
  selectedMovie,
  setSelectedMovie,
}) => {
  // Create a new array to ensure React detects the change
  const handleEditMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
    // If the selected movie is being edited, update it too
    if (selectedMovie && selectedMovie.id === updatedMovie.id) {
      setSelectedMovie(updatedMovie);
    }

    onClose(); // Close the dialog
  };

  return <MovieForm initialMovieInfo={movie} onSubmit={handleEditMovie} />;
};

export default EditMovie;

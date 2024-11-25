import React from 'react';
import MovieForm from "../MovieForm/MovieForm";

const EditMovie = ({ movie, setMovies, setIsDialogOpen, setDialogTitle, setDialogContent }) => {
  const handleEditMovie = () => {
    setDialogTitle("Edit Movie");
    setDialogContent(
      <MovieForm
        initialMovieInfo={movie}
        onSubmit={(updatedMovie) => {
          setMovies(prevMovies =>
            prevMovies.map(m => (m.id === movie.id ? { ...m, ...updatedMovie } : m))
          );
          setIsDialogOpen(false);
        }}
      />
    );
    setIsDialogOpen(true);
  };

  return (
    <button onClick={handleEditMovie}>Edit</button>
  );
};

export default EditMovie;
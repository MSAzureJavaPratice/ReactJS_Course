import React from 'react';
import MovieForm from "../MovieForm/MovieForm";
import "./AddMovie.css";

const AddMovie = ({ movies, setMovies, setIsDialogOpen, setDialogTitle, setDialogContent }) => {
  const handleAddMovie = () => {
    setDialogTitle("Add New Movie");
    setDialogContent(
      <MovieForm
        initialMovieInfo={{id: Math.max(...movies.map(m => m.id)) + 1, imageUrl: '', name: '', releaseYear: '', genres: [], rating:'', duration: '', description: ''}}
        onSubmit={(newMovie) => {
          setMovies((prevMovies) => [...prevMovies, newMovie]);
          setIsDialogOpen(false); // Close the dialog after submitting
        }}
      />
    );
    setIsDialogOpen(true);
  };

  return (
    <button className="add-movie-btn" onClick={handleAddMovie}>Add New Movie</button>
  );
};

export default AddMovie;
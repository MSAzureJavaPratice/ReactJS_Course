import React from 'react';

const DeleteMovie = ({ movie, setMovies, setIsDialogOpen, setDialogTitle, setDialogContent, sortedMovies, setSelectedMovie }) => {
  const handleDeleteMovie = () => {
    setDialogTitle("Delete Movie");
    setDialogContent(
      <div>
        <p>Are you sure you want to delete "{movie.name}"?</p>
        <div className="dialog-actions">
          <button
            onClick={() => {
              setMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
              setIsDialogOpen(false);
              setSelectedMovie(sortedMovies[0]);
            }}
          >
            Delete
          </button>
          <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
        </div>
      </div>
    );
    setIsDialogOpen(true);
  };

  return (
    <button onClick={handleDeleteMovie}>Delete</button>
  );
};

export default DeleteMovie;
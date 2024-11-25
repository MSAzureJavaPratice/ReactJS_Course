import React from 'react';

const DeleteMovie = ({ movie, setMovies, onClose, setSelectedMovie }) => {
  const handleDeleteMovie = () => {
    setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
    setSelectedMovie(null); 
    onClose();
  };

  return (
    <div>
      <p>Are you sure you want to delete "{movie.name}"?</p>
      <div className="dialog-actions">
        <button onClick={handleDeleteMovie}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteMovie;

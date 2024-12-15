import React from 'react';
import PropTypes from 'prop-types';
import './MovieDetails.css';

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return <p className="movie-details-loading">Loading movie details...</p>;
  }

  const { poster_path: posterPath, title, release_date: releaseDate, vote_average: rating, runtime, overview } = movie;

  return (
    <div className="movie-details">
      <img src={posterPath} alt={title} className="movie-details__image" />
      <div className="movie-details__info">
        <h2>{title}</h2>
        <p>Release Date: {releaseDate}</p>
        <p>Rating: {rating}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>{overview}</p>
      </div>
      <a href="/"><button className="back-button">Go Back to Home</button></a>
    </div>
  );
};

// Defining PropTypes
MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string.isRequired,
  })
};

export default MovieDetails;
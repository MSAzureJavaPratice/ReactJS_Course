import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  const {
    poster_path: posterPath,
    title,
    release_date: releaseDate,
    vote_average: rating,
    runtime,
    overview,
  } = movie;

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
    </div>
  );
};

export default MovieDetails;

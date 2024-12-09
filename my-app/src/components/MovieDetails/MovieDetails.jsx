import React from "react";

import "./MovieDetails.css";
// MovieDetails component
const MovieDetails = ({ movie }) => {
  const { imageUrl, name, releaseYear, rating, duration, description } = movie;

  return (
    <div className="movie-details">
      <img src={imageUrl} alt={name} className="movie-details__image" />
      <div className="movie-details__info">
        <h2> {name} </h2> <p> {releaseYear} </p> <p> Rating: {rating} </p>{" "}
        <p> Duration: {duration} </p> <p> {description} </p>{" "}
      </div>{" "}
    </div>
  );
};

export default MovieDetails;

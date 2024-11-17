import React, { useEffect, useState } from "react";
import movieService from "../../service/movieService";
import "./MovieDetails.css";

const MovieDetails = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log('Fetch Movie Details: ' + movieId);
        const movieData = await movieService.getMovieById(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

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

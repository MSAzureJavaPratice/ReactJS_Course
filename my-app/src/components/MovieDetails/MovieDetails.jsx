import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movieService from "../../service/movieService";
import "./MovieDetails.css";

const MovieDetails = ({ movie: movieProp }) => {
  const { movieId } = useParams(); // Extract movieId from the URL
  const navigate = useNavigate(); // For navigation
  const [movie, setMovie] = useState(movieProp || null); // Use movie from prop or initialize null
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    // If the movieProp changes, we should update the local state
    if (movieProp) {
      setMovie(movieProp); // Update state with movieProp
    }
  }, [movieProp]); // Watch for changes in movieProp

  useEffect(() => {
    console.log("movieProp" + JSON.stringify(movieProp));
    console.log("movieId" + movieId);
    // Fetch movie details from API if no movieProp and movieId exists
    if (!movieProp && movieId) {
      const fetchMovieDetails = async () => {
        try {
          const fetchedMovie = await movieService.getMovieById(movieId);
          setMovie(fetchedMovie); // Update state with fetched movie data
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setError("Failed to load movie details. Please try again.");
        }
      };
      fetchMovieDetails();
    }
  }, [movieId, movieProp]); // Re-fetch if movieId or movieProp changes

  if (error) {
    return (
      <div className="movie-details-error">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Back to Home</button>
      </div>
    );
  }

  if (!movie) {
    return <p className="movie-details-loading">Loading movie details...</p>;
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
      {!movieProp && (
        <div className="bottom">
          {/* Show back button only if movieProp is null */}

          <button onClick={() => navigate("/")} className="back-button">
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

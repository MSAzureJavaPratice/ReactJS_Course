import React, { useState } from "react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import "./MovieHomePage.css";

// Static Data for Movies
const movieData = [
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Inception",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
    rating: "8.8/10",
    duration: "148 minutes",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology...",
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Interstellar",
    releaseYear: "2014",
    genres: ["Sci-Fi", "Drama"],
    rating: "8.6/10",
    duration: "169 minutes",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "The Dark Knight",
    releaseYear: "2008",
    genres: ["Action", "Crime", "Drama"],
    rating: "9.0/10",
    duration: "152 minutes",
    description:
      "Batman faces off against the Joker, a criminal mastermind who seeks to create chaos in Gotham City.",
  },
];

const MovieHomePage = () => {
  // State for selected movie and sort order
  const [selectedMovie, setSelectedMovie] = useState(movieData[0]); // Set the first movie as default
  const [sortBy, setSortBy] = useState("releaseDate");

  // Function to handle movie tile click
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to handle movie edit
  const handleEditMovie = (movie) => {
    alert(`Editing movie: ${movie.name}`);
  };

  // Function to handle movie delete
  const handleDeleteMovie = (movie) => {
    alert(`Deleting movie: ${movie.name}`);
  };

  // Function to handle sorting change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // Sorting movie list based on selected sort order
  const sortedMovies = [...movieData].sort((a, b) => {
    if (sortBy === "releaseDate") {
      return b.releaseYear - a.releaseYear;
    }
    return a.name.localeCompare(b.name);
  });

   return (
    <div className="main-container">
      <div data-testid="movie-details">
        {selectedMovie && <MovieDetails movie={selectedMovie} />}{" "}
      </div>
      <div className="sort-control-container">
        <SortControl currentSort={sortBy} onSortChange={handleSortChange} />{" "}
      </div>
      <div className="movie-list" data-testid="movie-list">
        {sortedMovies.map((movie, index) => (
          <MovieTile
            key={index}
            movie={movie}
            onClick={handleMovieClick}
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default MovieHomePage;

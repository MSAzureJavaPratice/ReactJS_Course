import React, { useState, useEffect } from "react";
import "./MovieForm.css";

const availableGenres = [
  "Action", "Crime", "Drama", "Sci-Fi", "Thriller", "Fantasy", 
  "Adventure", "Romance",
];

const MovieForm = ({ initialMovieInfo = {}, onSubmit }) => {

  // Initialize the local state for form fields, including the id
  const [selectedGenres, setSelectedGenres] = useState(initialMovieInfo.genres || []);
  const [title, setTitle] = useState(initialMovieInfo.title || "");
  const [releaseDate, setReleaseDate] = useState(initialMovieInfo.release_date || "");
  const [overview, setOverview] = useState(initialMovieInfo.overview || "");
  const [runtime, setRuntime] = useState(initialMovieInfo.runtime || "");
  const [rating, setRating] = useState(initialMovieInfo.vote_average || "");
  const [posterPath, setPosterPath] = useState(initialMovieInfo.poster_path || "");
  const [movieId, setMovieId] = useState(initialMovieInfo.id || "");

  useEffect(() => {
    // Update the state if initialMovieInfo changes
    setSelectedGenres(initialMovieInfo.genres || []);
    setTitle(initialMovieInfo.title || "");
    setReleaseDate(initialMovieInfo.release_date || "");
    setOverview(initialMovieInfo.overview || "");
    setRuntime(initialMovieInfo.runtime || "");
    setRating(initialMovieInfo.vote_average || "");
    setPosterPath(initialMovieInfo.poster_path || "");
    setMovieId(initialMovieInfo.id || ""); // Ensure the ID is part of the state
  }, [initialMovieInfo]);

  const handleGenreChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedValues); // Update the selected genres in the state
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect all form data
    const updatedMovie = {
      id: movieId, // Ensure the movie ID is included
      title,
      release_date: releaseDate,
      genres: selectedGenres,
      overview,
      runtime: parseInt(runtime, 10), // Ensure runtime is an integer
      vote_average: parseFloat(rating), // Ensure vote_average is a float
      poster_path: posterPath,
    };

    // Pass the form data to the parent component
    onSubmit(updatedMovie);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            name="title"
            value={title} // Controlled input for title
            onChange={(e) => setTitle(e.target.value)} // Update title in state
          />
        </label>
      </div>
      <div>
        <label>
          Release Date:
          <input
            name="releaseDate"
            type="date"
            value={releaseDate} // Controlled input for release date
            onChange={(e) => setReleaseDate(e.target.value)} // Update release date in state
          />
        </label>
      </div>
      <div>
        <label>
          Genre:
          <select
            name="genre"
            multiple
            value={selectedGenres} // Controlled select for genres
            onChange={handleGenreChange} // Update selected genres in state
          >
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Runtime (minutes):
          <input
            name="runtime"
            type="number"
            value={runtime} // Controlled input for runtime
            onChange={(e) => setRuntime(e.target.value)} // Update runtime in state
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            name="rating"
            type="number"
            step="0.1"
            value={rating} // Controlled input for rating
            onChange={(e) => setRating(e.target.value)} // Update rating in state
          />
        </label>
      </div>
      <div>
        <label>
          Poster URL:
          <input
            name="posterPath"
            value={posterPath} // Controlled input for poster URL
            onChange={(e) => setPosterPath(e.target.value)} // Update poster URL in state
          />
        </label>
      </div>
      <div>
        <label>
          Overview:
          <textarea
            name="overview"
            rows="5"
            value={overview} // Controlled input for overview
            onChange={(e) => setOverview(e.target.value)} // Update overview in state
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;

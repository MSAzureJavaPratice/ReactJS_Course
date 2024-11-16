import React, { useState, useEffect } from "react";
import "./MovieForm.css";

const availableGenres = [
  "Action",
  "Crime",
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Fantasy",
  "Adventure",
  "Romance",
];

const MovieForm = ({ initialMovieInfo = {}, onSubmit }) => {
  console.log("Inside MovieForm: " + JSON.stringify(initialMovieInfo));

  // Initialize the local state for form fields
  const [selectedGenres, setSelectedGenres] = useState(initialMovieInfo.genres || []);
  const [title, setTitle] = useState(initialMovieInfo.name || "");
  const [releaseYear, setReleaseYear] = useState(initialMovieInfo.releaseYear || "");
  const [description, setDescription] = useState(initialMovieInfo.description || "");
  const [duration, setDuration] = useState(initialMovieInfo.duration || "");
  const [rating, setRating] = useState(initialMovieInfo.rating || "");
  const [imageUrl, setImageUrl] = useState(initialMovieInfo.imageUrl || "");

  useEffect(() => {
    // Update the genres if initialMovieInfo changes
    setSelectedGenres(initialMovieInfo.genres || []);
    setTitle(initialMovieInfo.name || "");
    setReleaseYear(initialMovieInfo.releaseYear || "");
    setDescription(initialMovieInfo.description || "");
    setDuration(initialMovieInfo.duration || "");
    setRating(initialMovieInfo.rating || "");
    setImageUrl(initialMovieInfo.imageUrl || "");
  }, [initialMovieInfo]);

  const handleGenreChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selectedValues); // Update the selected genres in the state
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect all form data
    const updatedMovie = {
      name: title,
      releaseYear,
      genres: selectedGenres,
      description,
      duration,
      rating,
      imageUrl,
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
          Release Year:
          <input
            name="releaseYear"
            value={releaseYear} // Controlled input for releaseYear
            onChange={(e) => setReleaseYear(e.target.value)} // Update releaseYear in state
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
          Duration:
          <input
            name="duration"
            value={duration} // Controlled input for duration
            onChange={(e) => setDuration(e.target.value)} // Update duration in state
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            name="rating"
            value={rating} // Controlled input for rating
            onChange={(e) => setRating(e.target.value)} // Update rating in state
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            name="imageUrl"
            value={imageUrl} // Controlled input for imageUrl
            onChange={(e) => setImageUrl(e.target.value)} // Update imageUrl in state
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            rows="5"
            value={description} // Controlled input for description
            onChange={(e) => setDescription(e.target.value)} // Update description in state
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;

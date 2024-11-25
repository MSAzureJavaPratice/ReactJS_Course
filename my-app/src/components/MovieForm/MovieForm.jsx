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

  // Initialize the local state for form fields
  const [id, setId] = useState(initialMovieInfo.id || null); // Preserve the id
  const [selectedGenres, setSelectedGenres] = useState(
    initialMovieInfo.genres || []
  );
  const [title, setTitle] = useState(initialMovieInfo.name || "");
  const [releaseYear, setReleaseYear] = useState(
    initialMovieInfo.releaseYear || ""
  );
  const [description, setDescription] = useState(
    initialMovieInfo.description || ""
  );
  const [duration, setDuration] = useState(initialMovieInfo.duration || "");
  const [rating, setRating] = useState(initialMovieInfo.rating || "");
  const [imageUrl, setImageUrl] = useState(initialMovieInfo.imageUrl || "");

  useEffect(() => {
    // Update all fields if initialMovieInfo changes
    setId(initialMovieInfo.id || null);
    setSelectedGenres(initialMovieInfo.genres || []);
    setTitle(initialMovieInfo.name || "");
    setReleaseYear(initialMovieInfo.releaseYear || "");
    setDescription(initialMovieInfo.description || "");
    setDuration(initialMovieInfo.duration || "");
    setRating(initialMovieInfo.rating || "");
    setImageUrl(initialMovieInfo.imageUrl || "");
  }, [initialMovieInfo]);

  const handleGenreChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedValues); // Update the selected genres in the state
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect all form data, including the id
    const updatedMovie = {
      id, // Include the id
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
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Release Year:
          <input
            name="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Genre:
          <select
            name="genre"
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
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
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            name="imageUrl"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;

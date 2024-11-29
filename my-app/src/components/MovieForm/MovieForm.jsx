import React, { useState, useEffect } from "react";
import "./MovieForm.css";

const availableGenres = [
  "Action", "Crime", "Drama", "Sci-Fi", "Thriller",
  "Fantasy", "Adventure", "Romance",
];

const MovieForm = ({ initialMovieInfo = {}, onSubmit }) => {
  const [movieInfo, setMovieInfo] = useState(() => ({
    id: initialMovieInfo.id || null,
    selectedGenres: initialMovieInfo.genres || [],
    title: initialMovieInfo.title || "",
    releaseYear: initialMovieInfo.releaseYear || "",
    description: initialMovieInfo.description || "",
    duration: initialMovieInfo.duration || "",
    rating: initialMovieInfo.rating || "",
    imageUrl: initialMovieInfo.imageUrl || "",
  }));

  // Synchronize movieInfo only when initialMovieInfo changes (using stable reference)
  useEffect(() => {
    setMovieInfo({
      id: initialMovieInfo.id || null,
      selectedGenres: initialMovieInfo.genres || [],
      title: initialMovieInfo.title || "",
      releaseYear: initialMovieInfo.releaseYear || "",
      description: initialMovieInfo.description || "",
      duration: initialMovieInfo.duration || "",
      rating: initialMovieInfo.rating || "",
      imageUrl: initialMovieInfo.imageUrl || "",
    });
  }, [
    initialMovieInfo.id,
    initialMovieInfo.genres,
    initialMovieInfo.title,
    initialMovieInfo.releaseYear,
    initialMovieInfo.description,
    initialMovieInfo.duration,
    initialMovieInfo.rating,
    initialMovieInfo.imageUrl,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genres") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setMovieInfo((prev) => ({ ...prev, selectedGenres: selectedOptions }));
    } else {
      setMovieInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(movieInfo);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input name="title" value={movieInfo.title} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Release Year:
          <input name="releaseYear" value={movieInfo.releaseYear} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Genre:
          <select
            name="genres"
            multiple
            value={movieInfo.selectedGenres}
            onChange={handleChange}
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
          <input name="duration" value={movieInfo.duration} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input name="rating" value={movieInfo.rating} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input name="imageUrl" value={movieInfo.imageUrl} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            rows="5"
            value={movieInfo.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MovieForm;

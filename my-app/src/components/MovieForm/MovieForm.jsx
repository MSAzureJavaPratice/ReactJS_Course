import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [movieId, setMovieId] = useState(initialMovieInfo.id || "");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialMovieInfo.title || "",
      release_date: initialMovieInfo.release_date || "",
      genres: initialMovieInfo.genres || [],
      runtime: initialMovieInfo.runtime || "",
      overview: initialMovieInfo.overview || "",
      vote_average: initialMovieInfo.vote_average || "",
      poster_path: initialMovieInfo.poster_path || "",
    },
  });

  useEffect(() => {
    // Prevent unnecessary resets by checking for actual changes
    if (Object.keys(initialMovieInfo).length > 0) {
      console.log("Resetting form with:", initialMovieInfo);

      reset({
        title: initialMovieInfo.title || "",
        release_date: initialMovieInfo.release_date || "",
        genres: initialMovieInfo.genres || [],
        runtime: initialMovieInfo.runtime || "",
        overview: initialMovieInfo.overview || "",
        vote_average: initialMovieInfo.vote_average || "",
        poster_path: initialMovieInfo.poster_path || "",
      });

      setMovieId(initialMovieInfo.id || "");
    }
  }, [initialMovieInfo, reset]);

  const submitHandler = (data) => {
    console.log('data submission: ' + JSON.stringify(data));
    onSubmit({
      ...data,
      id: movieId, // Include the movie ID in the submitted data
      runtime: parseInt(data.runtime, 10),
      vote_average: parseFloat(data.vote_average),
    });
  };

  return (
    <form
      className="movie-form"
      onSubmit={handleSubmit(submitHandler)}
      data-testid="movie-form"
    >
      <div>
        <label>
          Title:
          <input
            {...register("title", { required: "Title is required" })}
            data-testid="title"
          />
          {errors.title && (
            <span className="error">{errors.title.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Release Date:
          <input
            type="date"
            {...register("release_date", {
              required: "Release date is required",
            })}
            data-testid="release_date"
          />
          {errors.release_date && (
            <span className="error">{errors.release_date.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Genre:
          <Controller
            control={control}
            name="genres"
            rules={{ required: "At least one genre must be selected" }}
            render={({ field: { value, onChange } }) => (
              <select
                multiple
                value={value || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  onChange(selectedOptions);
                }}
                data-testid="genres"
              >
                {availableGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            )}
          />
        </label>
        {errors.genres && (
          <span className="error">{errors.genres.message}</span>
        )}
      </div>
      <div>
        <label>
          Runtime (minutes):
          <input
            type="number"
            {...register("runtime", {
              required: "Runtime is required",
              min: { value: 1, message: "Runtime must be at least 1 minute" },
            })}
            data-testid="runtime"
          />
          {errors.runtime && (
            <span className="error">{errors.runtime.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            type="number"
            step="0.1"
            {...register("vote_average", {
              required: "Rating is required",
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 10, message: "Rating cannot exceed 10" },
            })}
            data-testid="vote_average"
          />
          {errors.vote_average && (
            <span className="error">{errors.vote_average.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Poster URL:
          <input
            {...register("poster_path", {
              required: "Poster URL is required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                message: "Enter a valid image URL",
              },
            })}
            data-testid="poster_path"
          />
          {errors.poster_path && (
            <span className="error">{errors.poster_path.message}</span>
          )}
        </label>
      </div>
      <div>
        <label>
          Overview:
          <textarea
            rows="5"
            {...register("overview", {
              required: "Overview is required",
              minLength: {
                value: 10,
                message: "Overview must be at least 10 characters",
              },
            })}
            data-testid="overview"
          />
          {errors.overview && (
            <span className="error">{errors.overview.message}</span>
          )}
        </label>
      </div>
      <button type="submit" data-testid="submit-button">
        Submit
      </button>
    </form>
  );
};

export default MovieForm;

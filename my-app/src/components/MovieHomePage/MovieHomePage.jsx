import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";  // Updated import
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import SearchForm from "../SearchForm/SearchForm";
import GenreSelect from "../GenreSelect/GenreSelect";
import movieService from "../../service/movieService";
import "./MovieHomePage.css";

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Crime"];

const MovieHomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const defaultParams = {
    query: "",
    genre: "All",
    sortBy: "release_date",
    movieId: null,
  };

  const searchQuery = searchParams.get("query") || defaultParams.query;
  const activeGenre = searchParams.get("genre") || defaultParams.genre;
  const sortBy = searchParams.get("sortBy") || defaultParams.sortBy;
  const movieId = searchParams.get("movieId");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = {
          search: searchQuery,
          searchBy: "title",
          filter: activeGenre !== "All" ? activeGenre : undefined,
          sortBy,
          sortOrder: "desc",
        };
        const response = await movieService.getMovies(params);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery, activeGenre, sortBy]);

  const updateSearchParams = (updates) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...updates });
  };

  const handleSearch = (query) => {
    updateSearchParams({ query });
  };

  const handleGenreChange = (genre) => {
    updateSearchParams({ genre });
  };

  const handleSortChange = (newSort) => {
    updateSearchParams({ sortBy: newSort });
  };

  const handleMovieClick = (movie) => {
    updateSearchParams({ movieId: movie.id }); // Updates the movieId in the URL
  };

  const handleShareMovie = (movie) => {
    const url = `${window.location.origin}?movieId=${movie.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert(`Movie link copied to clipboard: ${url}`);
    });
  };

  const handleEditMovie = (movie) => {
    setDialogTitle("Edit Movie");
    setDialogContent(
      <MovieForm
        initialMovieInfo={movie}
        onSubmit={async (updatedMovie) => {
          try {
            const updatedMovieData = await movieService.updateMovie(updatedMovie);
            setMovies((prevMovies) =>
              prevMovies.map((m) => (m.id === movie.id ? updatedMovieData : m))
            );
            setIsDialogOpen(false);
          } catch (error) {
            console.error("Error updating movie:", error);
          }
        }}
      />
    );
    setIsDialogOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    setDialogTitle("Delete Movie");
    setDialogContent(
      <div>
        <p>Are you sure you want to delete "{movie.title}"?</p>
        <div className="dialog-actions">
          <button
            onClick={async () => {
              try {
                await movieService.deleteMovie(movie.id);
                setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
                setIsDialogOpen(false);
              } catch (error) {
                console.error("Error deleting movie:", error);
              }
            }}
          >
            Delete
          </button>
          <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
        </div>
      </div>
    );
    setIsDialogOpen(true);
  };

  return (
    <div className="main-container">
      <div className="filters-container">
        <SearchForm initialQuery={searchQuery} onSearch={handleSearch} />
        {movieId && (
        <div className="movie-details-container">
          <MovieDetails
            movieId={movieId}
          />
        </div>
      )}
        <div className="control-bar">
          <div className="genre-select-container">
            <GenreSelect
              genres={genres}
              activeGenre={activeGenre}
              onGenreChange={handleGenreChange}
            />
            <SortControl currentSort={sortBy} onSortChange={handleSortChange} />
          </div>
        </div>
      </div>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)}  // Updates the movieId in URL
            onEdit={() => handleEditMovie(movie)}
            onDelete={() => handleDeleteMovie(movie)}
            onShare={() => handleShareMovie(movie)}
          />
        ))}
      </div>

      {isDialogOpen && (
        <Dialog
          title={dialogTitle}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          {dialogContent}
        </Dialog>
      )}
    </div>
  );
};

export default MovieHomePage;

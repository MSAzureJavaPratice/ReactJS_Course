import React, { useState, useEffect } from "react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import SearchForm from "../SearchForm/SearchForm";
import GenreSelect from "../GenreSelect/GenreSelect";
import movieService from "../../service/movieService"; // Import the service layer
import "./MovieHomePage.css";

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Crime"];

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("release_date");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  // Fetch movies from the API
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

  const handleMovieClick = (movie) => setSelectedMovie(movie);

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

  const handleSortChange = (newSort) => setSortBy(newSort);

  return (
    <div className="main-container">
      <div className="filters-container">
        <SearchForm onSearch={(query) => setSearchQuery(query)} />
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
          />
        )}
        <div className="control-bar">
          <div className="genre-select-container">
            <GenreSelect
              genres={genres}
              activeGenre={activeGenre}
              onGenreChange={(genre) => setActiveGenre(genre)}
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
            onClick={handleMovieClick}
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
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

export default Main;
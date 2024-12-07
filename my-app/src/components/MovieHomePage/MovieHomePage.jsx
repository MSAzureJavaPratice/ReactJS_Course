import React, { useState, useEffect } from "react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import SearchForm from "../SearchForm/SearchForm";
import GenreSelect from "../GenreSelect/GenreSelect";
import AddMovie from "../AddMovie/AddMovie";
import EditMovie from "../EditMovie/EditMovie";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import movieService from "../../service/movieService";
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
  const [showSearch, setShowSearch] = useState(true);
  const [activeGenre, setActiveGenre] = useState("All");
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, activeGenre, sortBy]);

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

  const handleSortChange = (newSort) => setSortBy(newSort);

  const handleAddMovie = () => {
    setDialogTitle("Add New Movie");
    setDialogContent(
      <AddMovie
        onClose={() => setIsDialogOpen(false)}
        onMovieAdded={(newMovie) => setMovies((prev) => [...prev, newMovie])}
        setAlert={setAlert} 
      />
    );
    setIsDialogOpen(true);
  };

  const handleEditMovie = (movie) => {
    setDialogTitle("Edit Movie");
    setDialogContent(
      <EditMovie
        movie={movie}
        onClose={() => setIsDialogOpen(false)}
        onMovieUpdated={(updatedMovie) =>
          setMovies((prev) =>
            prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
          )
        }
        setAlert={setAlert} 
      />
    );
    setIsDialogOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    setDialogTitle("Delete Movie");
    setDialogContent(
      <DeleteMovie
        movie={movie}
        onClose={() => setIsDialogOpen(false)}
        onMovieDeleted={() =>
          setMovies((prev) => prev.filter((m) => m.id !== movie.id))
        }
      />
    );
    setIsDialogOpen(true);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowSearch(false);
  };

  const toggleSearch = () => {
    setSelectedMovie(null);
    setShowSearch((prev) => !prev);
  };

  return (
    <div className="main-container">
      <div className="filters-container content-section">
        {showSearch && (
          <div className="button-section">
            <button className="add-movie-btn" onClick={handleAddMovie}>
              Add Movie
            </button>
          </div>
        )}
        {showSearch ? (
          <SearchForm onSearch={(query) => setSearchQuery(query)} />
        ) : selectedMovie ? (
          <div className="movie-details-container content-section">
            <button className="toggle-search-btn" onClick={toggleSearch}>
              🔍
            </button>
            <MovieDetails
              movie={selectedMovie}
              onBack={() => {
                setSelectedMovie(null);
                setShowSearch(true);
              }}
            />
          </div>
        ) : null}
      </div>
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
      <div className="movie-list content-section">
        {Array.isArray(movies) &&
    movies.map((movie) =>  (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)}
            onEdit={() => handleEditMovie(movie)}
            onDelete={() => handleDeleteMovie(movie)}
          />
        ))}
      </div>
      {alert.message && (
        <Dialog
          title={alert.type === "success" ? "Success" : "Error"}
          isOpen={true}
          onClose={() => setAlert({ type: "", message: "" })}
        >
          <div className={`alert ${alert.type}`}>
            <p>{alert.message}</p>
          </div>
        </Dialog>
      )}
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
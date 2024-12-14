import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom"; // Updated import for useNavigate
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import SearchForm from "../SearchForm/SearchForm";
import GenreSelect from "../GenreSelect/GenreSelect";
// import EditMovie from "../EditMovie/EditMovie";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import movieService from "../../service/movieService";
import "./MovieHomePage.css";

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Crime"];

const Main = ({ movies, setMovies }) => {
  // const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("release_date");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize useNavigate

  // Retrieve search parameters from URL or set default values
  const searchQuery = searchParams.get("query") || "";
  const activeGenre = searchParams.get("genre") || "All";
  const sortByFromURL = searchParams.get("sortBy") || "release_date";
  const movieIdFromURL = searchParams.get("movieId");

  // Sync sortBy from URL to the state
  useEffect(() => {
    setSortBy(sortByFromURL);
  }, [sortByFromURL]);

  // Fetch movies based on the search params
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

  // Fetch movie details when the movieId from the URL is available
  useEffect(() => {
    if (movieIdFromURL) {
      const fetchMovieDetails = async () => {
        try {
          const movie = await movieService.getMovieById(movieIdFromURL);
          setSelectedMovie(movie);
          setShowSearch(false);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };
      fetchMovieDetails();
    }
  }, [movieIdFromURL]);

  // Update search params in the URL
  const updateSearchParams = (updates) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...updates });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    updateSearchParams({ sortBy: newSort });
  };

  const handleSearch = (query) => {
    updateSearchParams({ query });
  };

  const handleGenreChange = (genre) => {
    updateSearchParams({ genre });
  };

  const handleMovieClick = (movie) => {
    updateSearchParams({ movieId: movie.id }); // Update movieId in the URL
    setSelectedMovie(movie);
    setShowSearch(false);
  };

  const handleAddMovie = () => {
    const addMoviePath = "/new";
    if (window.location.pathname === addMoviePath) {
      navigate("/", { replace: true }); // Reset to root temporarily
      setTimeout(() => navigate(addMoviePath), 0); // Navigate back to /new
    } else {
      navigate(addMoviePath); // Navigate directly to /new
    }
  };
  
  const handleEditMovie = (movie) => {
    const editPath = `/movies/${movie.id}/edit`;
    if (window.location.pathname === editPath) {
      navigate("/", { replace: true }); // Reset to root temporarily
      setTimeout(() => navigate(editPath), 0); // Navigate back to edit page
    } else {
      navigate(editPath); // Navigate directly to the edit page
    }
  };
  

  // const handleEditMovie = (movie) => {
  //   setDialogTitle("Edit Movie");
  //   setDialogContent(
  //     <EditMovie
  //       movie={movie}
  //       onClose={() => setIsDialogOpen(false)}
  //       onMovieUpdated={(updatedMovie) =>
  //         setMovies((prev) =>
  //           prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
  //         )
  //       }
  //       setAlert={setAlert}
  //     />
  //   );
  //   setIsDialogOpen(true);
  // };

  

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

  const toggleSearch = () => {
    setSelectedMovie(null);
    setShowSearch((prev) => !prev);
    updateSearchParams({ movieId: null }); // Reset movieId in URL when closing movie details
    navigate("/", { replace: true }); // Reset to root temporarily
    setTimeout(() => navigate("/"), 0); // Navigate back to /new
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
          <SearchForm onSearch={handleSearch} initialQuery={searchQuery} />
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
                updateSearchParams({ movieId: null }); // Reset movieId when going back
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
            onGenreChange={handleGenreChange}
          />
          <SortControl currentSort={sortBy} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className="movie-list content-section">
        {Array.isArray(movies) && movies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie)} // Updates the movieId in the URL
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
      <Outlet/>
    </div>
  );
};

export default Main;
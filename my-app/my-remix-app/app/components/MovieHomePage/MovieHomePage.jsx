// app/components/MovieHomePage/MovieHomePage.jsx
import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import GenreSelect from "../GenreSelect/GenreSelect";
import SearchForm from "../SearchForm/SearchForm";
import PropTypes from "prop-types";
import "./MovieHomePage.css";

const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Crime"];

const MovieHomePage = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeGenre = searchParams.get("genre") || "All";
  const sortBy = searchParams.get("sortBy") || "release_date";

  return (
    <div className="main-container">
      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          onBack={() => setSelectedMovie(null)}
        />
      ) : (
        <>
          <div className="filters-container content-section">
            <SearchForm />
          </div>
          <div className="control-bar">
            <div className="genre-select-container">
            <GenreSelect genres={genres} activeGenre={activeGenre} searchParams={searchParams} />
            <SortControl currentSort={sortBy} searchParams={searchParams} />
            </div>
          </div>
          <div className="movie-list content-section">
            {Array.isArray(movies) ? (
              movies.map((movie) => (
                // <MovieTile key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
                <a
                  key={movie.id}
                  href={`/${movie.id}`}
                  className="movie-tile-link"
                >
                  <MovieTile movie={movie} />
                </a>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

MovieHomePage.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieHomePage;

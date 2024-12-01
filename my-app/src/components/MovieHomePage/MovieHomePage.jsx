import React, { useState } from "react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import AddMovie from "../AddMovie/AddMovie";
import EditMovie from "../EditMovie/EditMovie";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import "./MovieHomePage.css";

// Static Data for Movies
const movieData = [
  {
    id: 1,
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
    name: "Inception",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
    rating: "8.8/10",
    duration: "148 minutes",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology...",
  },
  {
    id: 2,
    imageUrl:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg",
    name: "Interstellar",
    releaseYear: "2014",
    genres: ["Sci-Fi", "Drama"],
    rating: "8.6/10",
    duration: "169 minutes",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 3,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4G5ph9HytFv084gnFFp1_mxWkzNKnPxuiKJqQvBtOR4iq-KsN4cCJiAe_Y6xSwlxqO6A&usqp=CAU",
    name: "The Dark Knight",
    releaseYear: "2008",
    genres: ["Action", "Crime", "Drama"],
    rating: "9.0/10",
    duration: "152 minutes",
    description:
      "Batman faces off against the Joker, a criminal mastermind who seeks to create chaos in Gotham City.",
  },
];

const Main = () => {
  const [movies, setMovies] = useState(movieData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("releaseYear");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleMovieClick = (movie) => setSelectedMovie(movie);

  // Handling sorting change
  const handleSortChange = (newSort) => {
    console.log('handleSort' + newSort);
    setSortBy(newSort);
  };

  // Sorted movies based on sorting options
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "releaseDate") return parseInt(b.releaseYear) - parseInt(a.releaseYear);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="main-container">
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <MovieDetails movie={sortedMovies[0]} />
      )}
      <div className="controls-container">
        <SortControl currentSort={sortBy} onSortChange={handleSortChange} />
        <AddMovie
          movies={movies}
          setMovies={setMovies}
          setIsDialogOpen={setIsDialogOpen}
          setDialogTitle={setDialogTitle}
          setDialogContent={setDialogContent}
        />
      </div>
      <div className="movie-list">
        {sortedMovies.map((movie) => (
           <MovieTile
           key={movie.id}
           movie={movie}
           onClick={() => handleMovieClick(movie)}
           onEdit={() => {
             setDialogTitle("Edit Movie");
             setDialogContent(
              <EditMovie
              movie={movie}
              setMovies={setMovies}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              onClose={() => setIsDialogOpen(false)}
            />            
              );
              setIsDialogOpen(true);
            }}
            onDelete={() => {
              setDialogTitle("Delete Movie");
              setDialogContent(
                <DeleteMovie
                  movie={movie}
                  setMovies={setMovies}
                  onClose={() => setIsDialogOpen(false)}
                  setSelectedMovie={setSelectedMovie}
                />
              );
              setIsDialogOpen(true);
            }}
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

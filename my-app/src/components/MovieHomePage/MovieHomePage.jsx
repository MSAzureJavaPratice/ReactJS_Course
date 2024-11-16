import React, { useState } from "react";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import "./MovieHomePage.css";

// Static Data for Movies
const movieData = [
  {
    id: 1,
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
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
    imageUrl: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg",
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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4G5ph9HytFv084gnFFp1_mxWkzNKnPxuiKJqQvBtOR4iq-KsN4cCJiAe_Y6xSwlxqO6A&usqp=CAU",
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
  const [selectedMovie, setSelectedMovie] = useState(movieData[0]);
  const [sortBy, setSortBy] = useState("releaseDate");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");

  const handleMovieClick = (movie) => setSelectedMovie(movie);

  const handleEditMovie = (movie) => {
    setDialogTitle("Edit Movie");
    setDialogContent(
      <MovieForm
        initialMovieInfo={movie}
        onSubmit={(updatedMovie) => {
          // Process the updated movie information (including genres)
          setMovies((prevMovies) =>
            prevMovies.map((m) =>
              m.id === movie.id ? { ...m, ...updatedMovie } : m
            )
          );
          setIsDialogOpen(false); // Close the dialog after submitting
        }}
      />
    );
    setIsDialogOpen(true);
  };

  const handleDeleteMovie = (movie) => {
    console.log("Inside Main Home Delete Page: " + movie);
    setDialogTitle("Delete Movie");
    setDialogContent(
      <div>
        <p> Are you sure you want to delete "{movie.name}" ? </p>{" "}
        <div className="dialog-actions">
          <button
            onClick={() => {
              setMovies((prevMovies) =>
                prevMovies.filter((m) => m.id !== movie.id)
              );
              setIsDialogOpen(false);
            }}
          >
            Delete{" "}
          </button>{" "}
          <button onClick={() => setIsDialogOpen(false)}> Cancel </button>{" "}
        </div>{" "}
      </div>
    );
    setIsDialogOpen(true);
    console.log("Inside Main Home setIsDialogOpen: " + isDialogOpen);
  };

  const handleSortChange = (newSort) => setSortBy(newSort);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "releaseDate") return b.releaseYear - a.releaseYear;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="main-container">
      {" "}
      {selectedMovie && <MovieDetails movie={selectedMovie} />}{" "}
      <div className="sort-control-container">
        <SortControl currentSort={sortBy} onSortChange={handleSortChange} />{" "}
      </div>{" "}
      <div className="movie-list">
        {" "}
        {sortedMovies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
          />
        ))}{" "}
      </div>{" "}
      {isDialogOpen && (
        <Dialog
          title={dialogTitle}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          {" "}
          {dialogContent}{" "}
        </Dialog>
      )}{" "}
    </div>
  );
};

export default Main;

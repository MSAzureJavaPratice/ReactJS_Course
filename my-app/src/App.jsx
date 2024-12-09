import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieHomePage from "./components/MovieHomePage/MovieHomePage";
import AddMovieForm from "./components/AddMovie/AddMovieForm";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import EditMovieDialog from "./components/EditMovie/EditMovieDialog";

function App() {
  const [movies, setMovies] = useState([]); // State to manage the movie list

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MovieHomePage movies={movies} setMovies={setMovies} />}
        >
          <Route path="new" element={<AddMovieForm setMovies={setMovies} />} />
          <Route
            path="movies/:movieId/edit"
            element={<EditMovieDialog movies={movies} setMovies={setMovies} />}
          />
        </Route>
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

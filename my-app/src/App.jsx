import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieHomePage from "./components/MovieHomePage/MovieHomePage";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Movie Search App</h1>
        <Routes>
          <Route path="/" element={<MovieHomePage />} />
          <Route path="/movies/:movieId" component={MovieDetails} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

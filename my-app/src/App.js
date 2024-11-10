import React, { useState } from "react";
import Counter from "./components/Counter";
import SearchForm from "./components/SearchForm";
import GenreSelect from "./components/GenreSelect";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> Counter Component </h1> <Counter initialValue={0} />{" "}
      <h1> Search Form Component </h1>{" "}
      <SearchForm initialQuery="Search here" onSearch={handleSearch} />{" "}
      <h1> Genre Select Component </h1>{" "}
      <GenreSelect
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={handleGenreSelect}
      />{" "}
    </div>
  );
}

export default App;

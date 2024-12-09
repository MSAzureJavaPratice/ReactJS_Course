import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-form-container">
      <h1>FIND YOUR MOVIE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="What do you want to watch?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

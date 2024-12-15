import React from "react";
import "./SortControl.css";

// SortControl component
const SortControl = ({ currentSort, onSortChange }) => {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort-by"> Sort by: </label>{" "}
      <select id="sort-by" value={currentSort} onChange={handleSortChange}>
        <option value="releaseDate"> Release Date </option>{" "}
        <option value="title"> Title </option>{" "}
      </select>{" "}
    </div>
  );
};

export default SortControl;

import React from 'react';
import "./SortControl.css";

const SortControl = ({ currentSort, searchParams }) => {
    // Retrieve all current search params, exclude 'sortBy'
    const currentParams = Array.from(searchParams.entries())
      .filter(([key]) => key !== 'sortBy');

    return (
        <div className="sort-control">
            <form action="/" method="GET">
                <label htmlFor="sort-by">Sort by:</label>
                
                    <select id="sort-by" name="sortBy" defaultValue={currentSort}>
                        <option value="release_date">Release Date</option>
                        <option value="title">Title</option>
                    </select>
                    {/* Propagate other parameters as hidden inputs */}
                    {currentParams.map(([key, value]) => (
                        <input key={key} type="hidden" name={key} value={value} />
                    ))}
                    {/* Submit button visually optimized to appear integrated */}
                    <input type="submit" value="" style={{ padding: "0px", background: "red", position: "absolute", marginTop: "25px", marginLeft: "-12px", height: "0px" }} />
            </form>
        </div>
    );
};

export default SortControl;
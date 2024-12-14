import { useSearchParams } from "@remix-run/react";
import "./SearchForm.css";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setSearchParams({ search: form.get('search') });
  };

  return (
    <div className="search-form-container">
      <h1>FIND YOUR MOVIE</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          className="search-input"
          placeholder="What do you want to watch?"
          defaultValue={search}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
// src/routes/movies.jsx
import { json, LoaderFunction } from "@remix-run/node";
import movieService from "../service/movieService";
import Main from "../components/MovieHomePage/MovieHomePage"; // The main component that lists movies

export const loader: LoaderFunction = async () => {
  const movies = await movieService.getMovies({});

  return json({ movies });
};

export default function Movies() {
  return (
    <div>
      <Main />
    </div>
  );
}
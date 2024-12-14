import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MovieHomePage from "../components/MovieHomePage/MovieHomePage";
import movieService from "../service/movieService";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  overview: string;
}

interface LoaderData {
  movies: Movie[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("search") || "";
  const genre = url.searchParams.get("genre") || "All";
  const sortBy = url.searchParams.get("sortBy") || "release_date";

  const response = await movieService.getMovies({
    search: query,
    searchBy: "title",
    filter: genre !== "All" ? genre : undefined,
    sortBy,
    sortOrder: "desc",
  });

  // Extract the data array from the response
  const movies: Movie[] = response.data || [];

  return json({ movies });
};

export default function Index() {
  const { movies } = useLoaderData<LoaderData>();

  return <MovieHomePage movies={movies} />;
}
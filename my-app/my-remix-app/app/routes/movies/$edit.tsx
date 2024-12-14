// src/routes/movies/$movieId/edit.jsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import movieService from "../../service/movieService";
import EditMovieDialog from "../../components/EditMovie/EditMovieDialog"; // Adjusted to match the existing component

type LoaderData = {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    overview: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { movieId } = params;

  if (!movieId) {
    throw new Response("Movie ID is required", { status: 400 });
  }

  const movieIdNumber = parseInt(movieId, 10);
  if (isNaN(movieIdNumber)) {
    throw new Response("Invalid Movie ID", { status: 400 });
  }

  const movie = await movieService.getMovieById(movieIdNumber);
  if (!movie) {
    throw new Response("Movie not found", { status: 404 });
  }

  return json({ movie });
};

export default function EditMoviePage() {
  const { movie } = useLoaderData<LoaderData>();

  return (
    <div>
      <EditMovieDialog
        movies={[movie]} // Pass the single fetched movie as an array
        setMovies={() => {}} // No-op; remix doesn't manage global state directly
      />
    </div>
  );
}

import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import movieService from "../service/movieService";
import MovieDetails from "../components/MovieDetails/MovieDetails";

export const loader: LoaderFunction = async ({ params }) => {
  const { movieId } = params;

  if (!movieId) {
    throw new Error("Movie ID is required but not provided");
  }
  
  const movieIdNumber = parseInt(movieId, 10); 
  if (isNaN(movieIdNumber)) {
    throw new Error("Invalid Movie ID provided"); 
  }

  const movie = await movieService.getMovieById(movieIdNumber);
  return json({ movie: movie ?? null }); 
};

export default function MovieDetailsRoute() {
  const { movie } = useLoaderData<typeof loader>();  
  return (
    <div>
      {movie 
        ? <MovieDetails movie={movie} />
        : <p>No movie data could be loaded. Please check the movie ID or try again later.</p>
      }
    </div>
  );
}
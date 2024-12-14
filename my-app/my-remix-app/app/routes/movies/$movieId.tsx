import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import movieService from "../../service/movieService";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

export const loader: LoaderFunction = async ({ params }) => {
  const { movieId } = params;
  console.log('inside loader function');
  console.log('params:', params); // Log the params object
  console.log('movieId:', movieId); // Log the movieId

  if (!movieId) throw new Error("Movie ID is required");

  // Convert movieId to a number
  const movieIdNumber = parseInt(movieId, 10); // Use parseInt to ensure it's a number

  // Check for NaN (if the string can't be converted to a number)
  if (isNaN(movieIdNumber)) throw new Error("Invalid Movie ID");

  const movie = await movieService.getMovieById(movieIdNumber); // Pass the number to the service
  console.log('movie:', movie); // Log the movie object

  return json({ movie });
};

export default function MovieDetailsRoute() {
  const { movie } = useLoaderData<typeof loader>();

  return <MovieDetails movie={movie} />;
}

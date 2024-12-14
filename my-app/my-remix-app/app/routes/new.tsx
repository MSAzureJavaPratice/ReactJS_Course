import React from "react";
import AddMovieForm from "../components/AddMovie/AddMovieForm"; // The form for adding a new movie

// Define the type for the props
interface NewMovieProps {
  setMovies: React.Dispatch<React.SetStateAction<[]>>; // Correct type for setMovies
}

export default function NewMovie({ setMovies }: NewMovieProps) {
  return (
    <div>
      <AddMovieForm setMovies={setMovies} />
    </div>
  );
}

import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import MovieTile from "../components/MovieTile/MovieTile";

export default {
  title: "Components/MovieTile",
  component: MovieTile,
} as Meta;

interface Movie {
  imageUrl: string;
  name: string;
  releaseYear: string;
  genres: string[];
}

const Template: StoryFn<{
  movie: Movie;
  onClick: (movie: Movie) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}> = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  movie: {
    imageUrl: "https://via.placeholder.com/150",
    name: "Inception",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
  },
  onClick: (movie) => alert(`Movie clicked: ${movie.name}`),
  onEdit: (movie) => alert(`Edit clicked for: ${movie.name}`),
  onDelete: (movie) => alert(`Delete clicked for: ${movie.name}`),
};

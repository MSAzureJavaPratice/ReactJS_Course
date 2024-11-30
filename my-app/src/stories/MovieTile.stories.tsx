import React from "react";
import { Meta, StoryFn as Story } from "@storybook/react";
import MovieTile from "../components/MovieTile/MovieTile";
import { Movie } from "../components/MovieTile/MovieTile"; // Ensure this import is correct

export default {
  title: "Components/MovieTile",
  component: MovieTile,
} as Meta;

const Template: Story<{ movie: Movie, onClick: (movie: Movie) => void, onEdit: (movie: Movie) => void, onDelete: (movie: Movie) => void }> = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  movie: {
    imageUrl: "https://via.placeholder.com/150",
    name: "Inception",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
  },
  onClick: (movie) => console.log(`Clicked: ${movie.name}`),
  onEdit: (movie) => console.log(`Edit: ${movie.name}`),
  onDelete: (movie) => console.log(`Delete: ${movie.name}`)
};
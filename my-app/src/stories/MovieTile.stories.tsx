import React from "react";
import { Meta, StoryFn as Story } from "@storybook/react";
import MovieTile from "../components/MovieTile/MovieTile";

// Define story metadata
export default {
  title: "Components/MovieTile",
  component: MovieTile,
} as Meta;

// Template for the story
const Template: Story<{
  movie: {
    poster_path: string;
    title: string;
    release_date: string;
    genres: string[];
  };
  onClick: (movie: any) => void;
  onEdit: (movie: any) => void;
  onDelete: (movie: any) => void;
}> = (args) => <MovieTile {...args} />;

// Default story - passing movie data as prop and actions for click, edit, delete
export const Default = Template.bind({});
Default.args = {
  movie: {
    poster_path: "https://via.placeholder.com/300x450",
    title: "Inception",
    release_date: "2010-07-16",
    genres: ["Sci-Fi", "Thriller"],
  },
  onClick: (movie) => console.log(`Clicked: ${movie.title}`),
  onEdit: (movie) => console.log(`Edit: ${movie.title}`),
  onDelete: (movie) => console.log(`Delete: ${movie.title}`),
};

// Alternative states (optional)
export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  movie: {
    poster_path: "https://via.placeholder.com/300x450",
    title: "A Very Long Movie Title That Just Keeps Going and Going",
    release_date: "2022-05-22",
    genres: ["Action", "Drama", "Thriller"],
  },
  onClick: (movie) => console.log(`Clicked: ${movie.title}`),
  onEdit: (movie) => console.log(`Edit: ${movie.title}`),
  onDelete: (movie) => console.log(`Delete: ${movie.title}`),
};

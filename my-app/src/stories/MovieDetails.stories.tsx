import React from "react";
import { Meta, Story } from "@storybook/react"; // Correct Story import
import MovieDetails from "../components/MovieDetails/MovieDetails"; // Import your component

// Define the Movie type to be used in the story
interface Movie {
  imageUrl: string;
  name: string;
  releaseYear: string;
  genres: string[];
  rating: string;
  duration: string;
  description: string;
}

// Storybook metadata for MovieDetails component
export default {
  title: "Components/MovieDetails", // Title for the story
  component: MovieDetails,
} as Meta;

// Template to render the MovieDetails component
const Template: Story<{
  movie: Movie;
}> = (args) => <MovieDetails {...args} />;

// Default story for MovieDetails
export const Default = Template.bind({});
Default.args = {
  movie: {
    imageUrl: "https://via.placeholder.com/150",
    name: "Inception",
    releaseYear: "2010",
    genres: ["Sci-Fi", "Thriller"],
    rating: "8.8/10",
    duration: "148 minutes",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology...",
  },
};

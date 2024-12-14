import React from "react";
import { Meta, StoryFn as Story } from "@storybook/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import MovieDetails from "../components/MovieDetails/MovieDetails";

// Define story metadata
export default {
  title: "Components/MovieDetails",
  component: MovieDetails,
} as Meta;

// Template for the story
const Template: Story<{ movie: { poster_path: string, title: string, release_date: string, vote_average: string, runtime: number, overview: string }, error?: string }> = (args) => (
  <MemoryRouter>
    <MovieDetails {...args} />
  </MemoryRouter>
);

// Default story - passing movie data as prop
export const Default = Template.bind({});
Default.args = {
  movie: {
    poster_path: "https://via.placeholder.com/300x450",
    title: "Inception",
    release_date: "2010-07-16",
    vote_average: "8.8",
    runtime: 148,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology...",
  },
};

// Loading state - no movie prop provided
export const Loading = Template.bind({});
Loading.args = {
  movie: null,  // Simulate the loading state (movie is not provided)
};

// Error state - simulate an error scenario
export const ErrorState = Template.bind({});
ErrorState.args = {
  movie: null,  // Simulate the loading state (movie is not provided)
  error: "Failed to load movie details. Please try again.",
};
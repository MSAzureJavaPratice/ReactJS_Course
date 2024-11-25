import React from "react";
import { Meta, StoryFn as Story } from "@storybook/react";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { Movie } from "../components/MovieDetails/MovieDetails"; 

export default {
  title: "Components/MovieDetails",
  component: MovieDetails,
} as Meta;

const Template: Story<{ movie: Movie }> = (args) => <MovieDetails {...args} />;

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
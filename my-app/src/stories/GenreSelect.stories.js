import React from "react";
import GenreSelect from "../components/GenreSelect"; // Adjust the path if necessary

export default {
  title: "Components/GenreSelect", // Storybook category
  component: GenreSelect, // The component to render
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
    a11y: { disable: false }, // Enable accessibility checks
  },
  argTypes: {
    genres: {
      control: { type: "array" }, // Allow input as an array for genres
      description: "List of genres to display",
    },
    selectedGenre: {
      control: { type: "text" }, // Allow input for selected genre
      description: "The genre that is selected by default",
    },
  },
};

// Template for rendering the GenreSelect component
const Template = (args) => <GenreSelect {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  selectedGenre: "Comedy",
};

// Story with no genres selected
export const NoGenreSelected = Template.bind({});
NoGenreSelected.args = {
  genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  selectedGenre: "",
};

// Story with dynamic selection
export const DynamicGenreSelect = Template.bind({});
DynamicGenreSelect.args = {
  genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  selectedGenre: "Drama",
};

// Story with accessibility checks
export const AccessibleGenreSelect = Template.bind({});
AccessibleGenreSelect.args = {
  genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  selectedGenre: "Action",
};
AccessibleGenreSelect.parameters = {
  a11y: { disable: false }, // Ensure a11y testing is active
};

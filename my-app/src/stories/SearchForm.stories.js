import React from "react";
import SearchForm from "../components/SearchForm"; // Adjust the path if necessary

export default {
  title: "Components/SearchForm", // Storybook category
  component: SearchForm, // The component to render
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
    initialQuery: {
      control: { type: "text" }, // Allow text input for the initial query
      description: "Initial search query",
    },
    onSearch: {
      action: "searched", // Log the search query when the search is triggered
      description: "Callback function when search is triggered",
    },
  },
};

// Template for rendering the SearchForm component
const Template = (args) => <SearchForm {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  initialQuery: "",
};

// Story with a pre-filled query
export const WithInitialQuery = Template.bind({});
WithInitialQuery.args = {
  initialQuery: "Adventure",
};

// Story with dynamic input and search action
export const DynamicSearch = Template.bind({});
DynamicSearch.args = {
  initialQuery: "",
};
DynamicSearch.argTypes = {
  initialQuery: {
    control: { type: "text" },
  },
};

// Story with accessibility checks
export const AccessibleSearchForm = Template.bind({});
AccessibleSearchForm.args = {
  initialQuery: "",
};
AccessibleSearchForm.parameters = {
  a11y: { disable: false }, // Ensure a11y testing is active
};

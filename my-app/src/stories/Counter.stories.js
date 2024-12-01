import React from "react";
import Counter from "../components/Counter";

export default {
  title: "Components/Counter", // Storybook category
  component: Counter, // The component to render
  parameters: {
    // Add backgrounds to test on light and dark themes
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
    // Add accessibility testing support
    a11y: {
      disable: false, // Enable accessibility checks
    },
  },
  argTypes: {
    initialValue: {
      control: { type: "number" }, // Slider or number input
      description: "Initial value for the counter",
      defaultValue: 0,
    },
  },
};

// Template for rendering the Counter component
const Template = (args) => <Counter {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  initialValue: 0,
};

// Story with positive initial value
export const WithPositiveInitialValue = Template.bind({});
WithPositiveInitialValue.args = {
  initialValue: 10,
};

// Story with negative initial value
export const WithNegativeInitialValue = Template.bind({});
WithNegativeInitialValue.args = {
  initialValue: -5,
};

// Story with a large initial value
export const LargeValue = Template.bind({});
LargeValue.args = {
  initialValue: 1000,
};

// Story with dynamic control for initial value
export const DynamicInitialValue = Template.bind({});
DynamicInitialValue.args = {
  initialValue: 0,
};
DynamicInitialValue.argTypes = {
  initialValue: {
    control: { type: "range", min: -100, max: 100, step: 1 },
  },
};

// Story for loading state example
export const LoadingState = Template.bind({});
LoadingState.args = {
  initialValue: 0, // Simulated loading starts at 0
};
LoadingState.parameters = {
  backgrounds: { default: "dark" }, // Override background for this story
  docs: {
    description: {
      story:
        "Demonstrates how the Counter behaves during a simulated loading state.",
    },
  },
};

// Story for counter accessibility
export const AccessibleCounter = Template.bind({});
AccessibleCounter.args = {
  initialValue: 5,
};
AccessibleCounter.parameters = {
  a11y: {
    disable: false, // Enable a11y testing for this specific story
  },
};

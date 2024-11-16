import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SortControl from "../components/SortControl/SortControl";

export default {
  title: "Components/SortControl",
  component: SortControl,
} as Meta;

interface SortControlProps {
  currentSort: string;
  onSortChange: (newSort: string) => void;
}

const Template: StoryFn<SortControlProps> = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentSort: "releaseDate",
  onSortChange: (newSort: string) => alert(`Sorting by: ${newSort}`),
};

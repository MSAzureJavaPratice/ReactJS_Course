import React from "react";
import { Meta, StoryFn as Story } from "@storybook/react";
import SortControl from "../components/SortControl/SortControl";
import { SortControlProps } from "../components/SortControl/SortControl"; // Assuming you export SortControlProps from SortControl component

export default {
  title: "Components/SortControl",
  component: SortControl,
} as Meta;

const Template: Story<SortControlProps> = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentSort: "releaseDate",
  onSortChange: (newSort) => alert(`Sorting by: ${newSort}`),
};
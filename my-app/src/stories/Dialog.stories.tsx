import React from "react";
import Dialog from "../components/Dialog/Dialog";
import MovieForm from "../components/MovieForm/MovieForm";
import DeleteMovie from "../components/DeleteMovie/DeleteMovie";
import EditMovie from "../components/EditMovie/EditMovie";

export default {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
  },
};

const Template = (args) => <Dialog {...args} />;

// Use cases

export const AddMovieDialog = Template.bind({});
AddMovieDialog.args = {
  isOpen: true,
  title: "Add New Movie",
  children: (
    <MovieForm
      initialMovieInfo={{
        imageUrl: "",
        name: "",
        releaseYear: "",
        genres: [],
        rating: "",
        duration: "",
        description: "",
      }}
      onSubmit={console.log}
    />
  ),
};

export const EditMovieDialog = Template.bind({});
EditMovieDialog.args = {
  isOpen: true,
  title: "Edit Movie",
  children: (
    <EditMovie
      movie={{
        id: 1,
        name: "Inception",
        releaseYear: "2010",
        imageUrl: "",
        genres: ["Sci-Fi"],
        rating: "8.8/10",
        duration: "148 minutes",
        description:
          "A thief who steals corporate secrets through dream-sharing technology.",
      }}
      setMovies={(updatedMovies) => console.log(updatedMovies)}
      selectedMovie={{ id: 1 }}
      setSelectedMovie={console.log}
      onClose={() => console.log("Closed")}
    />
  ),
};

export const DeleteMovieDialog = Template.bind({});
DeleteMovieDialog.args = {
  isOpen: true,
  title: "Delete Movie",
  children: (
    <DeleteMovie
      movie={{
        id: 1,
        name: "Inception",
      }}
      setMovies={(updatedMovies) => console.log(updatedMovies)}
      onClose={() => console.log("Closed")}
      setSelectedMovie={console.log}
    />
  ),
};

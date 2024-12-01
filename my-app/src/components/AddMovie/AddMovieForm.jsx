import React, { useState } from "react";
import Dialog from "../Dialog/Dialog";
import AddMovie from "../AddMovie/AddMovie";
import { useNavigate } from "react-router-dom";

const AddMovieForm = ({ setMovies }) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(true); // Controls the Add Movie dialog
  const [alert, setAlert] = useState({ type: "", message: "" }); // For success/error alerts
  const [newMovieId, setNewMovieId] = useState(null);
  const navigate = useNavigate();

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false); // Close the Add Movie dialog
  };

  const handleCloseAlertDialog = () => {
    if (alert.type === "success") {
      navigate(`/movies/${newMovieId}`); // Redirect to the new movie's details page
    } else {
      navigate("/"); // Redirect to homepage on failure
    }
    setAlert({ type: "", message: "" }); // Clear the alert
  };

  const handleMovieAdded = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
    setNewMovieId(newMovie.id); // Store new movie ID for redirection
  };

  return (
    <>
      {isAddDialogOpen && (
        <Dialog title="Add New Movie" isOpen={true} onClose={handleCloseAddDialog}>
          <AddMovie
            onClose={handleCloseAddDialog} // Close Add Movie dialog on submission
            onMovieAdded={handleMovieAdded}
            setAlert={setAlert}
          />
        </Dialog>
      )}
      {alert.message && (
        <Dialog
          title={alert.type === "success" ? "Success" : "Error"}
          isOpen={true}
          onClose={handleCloseAlertDialog} // Handle redirection on alert close
        >
          <div className={`alert ${alert.type}`}>
            <p>{alert.message}</p>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default AddMovieForm;

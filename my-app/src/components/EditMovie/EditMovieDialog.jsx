import React, { useState, useEffect } from "react";
import Dialog from "../Dialog/Dialog";
import EditMovie from "../EditMovie/EditMovie";
import { useParams, useNavigate } from "react-router-dom";
import movieService from "../../service/movieService";

const EditMovieDialog = ({ movies, setMovies }) => {
  const { movieId } = useParams(); // Get movieId from the URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(true); // Controls the Edit Movie dialog
  const [alert, setAlert] = useState({ type: "", message: "" }); // For success/error alerts

  // Fetch movie details if not already available
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieDetails = movies.find((m) => m.id === parseInt(movieId));
        if (movieDetails) {
          setMovie(movieDetails); // Use cached movie data if available
        } else {
          const fetchedMovie = await movieService.getMovieById(movieId);
          setMovie(fetchedMovie);
        }
      } catch (error) {
        console.error("Error fetching movie for editing:", error);
        setAlert({
          type: "error",
          message: "Unable to fetch movie details. Please try again.",
        });
        navigate("/"); // Redirect to homepage if fetching fails
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId, movies, navigate]);

  const handleMovieUpdated = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
    setAlert({ type: "success", message: "Movie updated successfully!" });
    handleCloseEditDialog();
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseAlertDialog = () => {
    if (alert.type === "success") {
      navigate(`/movies/${movieId}`); // Redirect to the edited movie's details page
    } else {
      navigate("/"); // Redirect to homepage on failure
    }
    setAlert({ type: "", message: "" }); // Clear the alert
  };

  if (!movie) return null; // Wait until movie is fetched

  return (
    <>
      {isEditDialogOpen && (
        <Dialog
          title="Edit Movie"
          isOpen={true}
          onClose={handleCloseEditDialog}
        >
          <EditMovie
            movie={movie}
            onClose={handleCloseEditDialog}
            onMovieUpdated={handleMovieUpdated}
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

export default EditMovieDialog;

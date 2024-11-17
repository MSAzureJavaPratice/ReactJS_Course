import axios from "axios";

const BASE_URL = "http://localhost:4000/movies";

const movieService = {
    /**
     * Fetch a list of movies with optional filters and sorting.
     * @param {Object} params - Query parameters for filtering, sorting, and pagination.
     * @returns {Promise<Object>} Movies response containing data, total, offset, and limit.
     */
    getMovies: async(params = {}) => {
        try {
            const response = await axios.get(BASE_URL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error;
        }
    },

    /**
     * Create a new movie.
     * @param {Object} movieData - The movie data to create.
     * @returns {Promise<Object>} The created movie object.
     */
    createMovie: async(movieData) => {
        try {
            const response = await axios.post(BASE_URL, movieData);
            return response.data;
        } catch (error) {
            console.error("Error creating movie:", error);
            throw error;
        }
    },

    /**
     * Update an existing movie by ID.
     * @param {number} id - The unique identifier of the movie.
     * @param {Object} movieData - The movie data to update.
     * @returns {Promise<Object>} The updated movie object.
     */
    updateMovie: async(movieData) => {
        try {
            const response = await axios.put(BASE_URL, movieData);
            return response.data;
        } catch (error) {
            console.error("Error updating movie:", error);
            throw error;
        }
    },

    /**
     * Get a movie by its ID.
     * @param {number} id - The unique identifier of the movie.
     * @returns {Promise<Object>} The movie object.
     */
    getMovieById: async(id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movie by ID:", error);
            throw error;
        }
    },

    /**
     * Delete a movie by its ID.
     * @param {number} id - The unique identifier of the movie.
     * @returns {Promise<void>} Resolves when the movie is deleted.
     */
    deleteMovie: async(id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
        } catch (error) {
            console.error("Error deleting movie:", error);
            throw error;
        }
    },
};

export default movieService;
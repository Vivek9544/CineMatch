import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Create an axios instance with the base URL and explicit headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetches the list of all available movies from the backend.
 * @returns {Promise<string[]>} A promise that resolves to an array of movie titles.
 */
export const fetchMovies = async () => {
  try {
    const response = await api.get('/movies');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies. Please ensure the Flask backend is running.');
  }
};

/**
 * Fetches movie recommendations based on a selected movie.
 * @param {string} selectedMovieTitle - The title of the movie to get recommendations for.
 * @returns {Promise<Object[]>} A promise that resolves to an array of recommendation objects { title, poster }.
 */
export const recommendMovie = async (selectedMovieTitle) => {
  try {
    // Explicitly defining the payload exactly as required by the backend
    const payload = {
      movie: selectedMovieTitle
    };
    
    // Axios will automatically stringify the payload to JSON and send it
    const response = await api.post('/recommend', payload);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Backend returned a specific error (e.g. movie not found)
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch recommendations. Please ensure the backend is running.');
  }
};

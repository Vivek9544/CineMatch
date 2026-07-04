import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { fetchMovies, recommendMovie } from '../services/api';

export default function Home() {
  // Recommendation states
  const [recommendations, setRecommendations] = useState([]);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendError, setRecommendError] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState("");
  
  // Movie fetching states
  const [availableMovies, setAvailableMovies] = useState([]);
  const [isFetchingMovies, setIsFetchingMovies] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies on initial load
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsFetchingMovies(true);
        const data = await fetchMovies();
        setAvailableMovies(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsFetchingMovies(false);
      }
    };

    loadMovies();
  }, []);

  const handleRecommend = async (selectedMovieTitle) => {
    if (!selectedMovieTitle) return; // Basic validation just in case
    
    setSearchedMovie(selectedMovieTitle);
    setIsRecommending(true);
    setRecommendError(null);
    setRecommendations([]); // Clear previous recommendations
    
    try {
      // Fetch recommendations from backend
      const results = await recommendMovie(selectedMovieTitle);
      
      // Verify response is an array before setting state to avoid rendering issues
      if (Array.isArray(results)) {
        setRecommendations(results);
      } else {
        throw new Error("Invalid response format received from the server.");
      }
    } catch (err) {
      setRecommendError(err.message);
    } finally {
      setIsRecommending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Discover Your Next Favorite Movie
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Powered by Machine Learning and Cosine Similarity
        </p>
      </div>

      {isFetchingMovies ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader />
          <p className="text-gray-500 mt-4">Loading movie list...</p>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-8">
          {error}
        </div>
      ) : (
        <SearchBar 
          onRecommend={handleRecommend} 
          availableMovies={availableMovies} 
          isRecommending={isRecommending}
        />
      )}

      {isRecommending ? (
        <div className="mt-12 flex flex-col items-center">
          <Loader />
          <p className="text-gray-500 mt-4">Finding similar movies...</p>
        </div>
      ) : recommendError ? (
        <div className="max-w-2xl mx-auto mt-12 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
          {recommendError}
        </div>
      ) : (
        <div className="mt-12">
          {recommendations.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
                Recommended based on <span className="text-blue-600">{searchedMovie}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recommendations.map((recItem, index) => (
                  <MovieCard key={index} title={recItem.title} poster={recItem.poster} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

export default function SearchBar({ onRecommend, availableMovies = [], isRecommending = false }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleRecommend = () => {
    // If no movie is selected: Ask the user to select a movie before recommending.
    if (!selectedMovie) {
      setValidationError("Please select a movie before recommending.");
      return;
    }
    setValidationError("");
    onRecommend(selectedMovie);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 mt-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Find Similar Movies</h2>
      <p className="text-gray-500 text-sm mb-4">Select a movie from the dropdown to get recommendations.</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <select 
          value={selectedMovie}
          onChange={(e) => {
            setSelectedMovie(e.target.value);
            setValidationError("");
          }}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          disabled={availableMovies.length === 0 || isRecommending}
        >
          <option value="" disabled>
            {availableMovies.length === 0 ? "Loading movies..." : "Select a movie..."}
          </option>
          {availableMovies.map((movie) => (
            <option key={movie} value={movie}>
              {movie}
            </option>
          ))}
        </select>
        
        <button 
          onClick={handleRecommend}
          // Button remains clickable if no movie is selected so we can show the validation error.
          // It is disabled while recommending or if movies haven't loaded yet.
          disabled={availableMovies.length === 0 || isRecommending}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
        >
          {isRecommending ? "Recommending..." : "Recommend"}
        </button>
      </div>
      
      {validationError && (
        <p className="text-red-500 text-sm mt-3">{validationError}</p>
      )}
    </div>
  );
}

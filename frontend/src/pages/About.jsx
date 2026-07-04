export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About This Project</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="mb-4 text-lg">
            This is an educational movie recommendation application designed to demonstrate how machine learning can be integrated with a modern web stack.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h2>
          <p className="mb-4">
            The core of the application relies on <strong>Content-Based Filtering</strong>. By analyzing movie metadata—such as genres, keywords, cast, and crew—we build a mathematical representation of each movie.
          </p>
          
          <p className="mb-4">
            We use a tool called <strong>CountVectorizer</strong> to convert text data into vectors, and then we measure how similar one movie's data is to another using <strong>Cosine Similarity</strong>. When you select a movie, the algorithm instantly finds the closest matches in our vector space and suggests them to you.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tech Stack</h2>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
            <li><strong>Backend:</strong> Python, Flask</li>
            <li><strong>Machine Learning:</strong> Scikit-Learn (CountVectorizer), Pandas</li>
            <li><strong>Data Source:</strong> TMDB API (The Movie Database)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

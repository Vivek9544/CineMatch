export default function MovieCard({ title, poster }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {poster ? (
        <img 
          src={poster} 
          alt={`${title} poster`} 
          className="w-full h-80 object-cover"
        />
      ) : (
        <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1" title={title}>
          {title}
        </h3>
      </div>
    </div>
  );
}

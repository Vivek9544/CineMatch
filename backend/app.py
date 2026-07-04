from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from recommender import recommend, get_movie_list

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Movie Recommendation API is running!",
        "endpoints": {
            "GET /movies": "Get all movie titles",
            "POST /recommend": "Get movie recommendations"
        }
    })

@app.route('/movies', methods=['GET'])
def get_movies():
    # Returns a JSON array of all movie titles
    movie_list = get_movie_list()
    return jsonify(movie_list)

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    data = request.get_json()
    if not data or 'movie' not in data:
        return jsonify({"error": "Please provide a movie title in the JSON body."}), 400
    
    movie_title = data['movie']
    
    try:
        # recommend() returns two lists: names and posters
        names, posters = recommend(movie_title)
        
        # Combine the lists into the requested JSON array of objects
        recommendations = [
            {"title": name, "poster": poster}
            for name, poster in zip(names, posters)
        ]
        
        return jsonify(recommendations)
    except IndexError:
        return jsonify({"error": "Movie not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

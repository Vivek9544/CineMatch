<div align="center">
  <img src="https://via.placeholder.com/800x200?text=CineMatch+Banner" alt="CineMatch Banner" />
  
  # CineMatch
  
  **An Intelligent Content-Based Movie Recommendation System built with Machine Learning, Flask, and React.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-API-green.svg)](https://flask.palletsprojects.com/)
  [![React](https://img.shields.io/badge/React-Vite-blueviolet.svg)](https://reactjs.org/)
</div>

## 📖 Introduction
CineMatch is a professional, open-source movie recommendation platform that leverages machine learning to suggest movies based on content similarities. By analyzing movie metadata—such as genres, keywords, cast, and crew—CineMatch accurately determines the relationship between different movies and provides personalized recommendations instantly.

## ✨ Features
- **Intelligent Recommendations**: Powered by Content-Based Filtering and Cosine Similarity.
- **Modern UI/UX**: A clean, responsive, and beginner-friendly React interface styled with Tailwind CSS.
- **Robust REST API**: A lightweight and efficient Python Flask backend.
- **Dynamic Data**: Real-time movie poster fetching via the TMDB API.
- **Modular Architecture**: Clean separation of concerns between Machine Learning models, API services, and Frontend components.

## 🛠️ Tech Stack
- **Machine Learning**: Scikit-Learn, Pandas, Numpy
- **Backend**: Python, Flask, Flask-CORS
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **External API**: TMDB (The Movie Database) API

## 🧠 Machine Learning Pipeline

### 1. Content-Based Filtering
CineMatch uses Content-Based Filtering to recommend items by comparing the attributes of the item itself (genres, overview, cast, crew) against other items.

### 2. Data Preprocessing & Feature Engineering
Raw movie data is cleaned and aggregated into a single continuous string (or "tag") representing all critical metadata for each movie.

### 3. CountVectorizer
We convert the text tags into numerical vectors using Scikit-Learn's `CountVectorizer`. This maps the frequency of each word into a multidimensional vector space.

### 4. Cosine Similarity
To find the closest match, we calculate the angle between the vectors. The smaller the angle, the higher the cosine similarity, meaning the movies share very similar attributes.

**Workflow Diagram:**
```text
[ Raw Movie Data ] 
       ↓
[ Text Aggregation (Tags) ] 
       ↓
[ CountVectorizer (Text to Vectors) ] 
       ↓
[ Cosine Similarity Matrix ] 
       ↓
[ Top 5 Nearest Neighbors (Recommendations) ]
```

## 🏗️ System Architecture
```text
                  +-------------------+
                  |   React Frontend  |
                  | (Vite + Tailwind) |
                  +--------+----------+
                           | Axios (HTTP)
                           v
                  +-------------------+
                  |  Flask REST API   |
                  +--------+----------+
                           |
            +--------------+--------------+
            |                             |
  +---------v---------+         +---------v---------+
  | Recommendation ML |         |     TMDB API      |
  | (Cosine Matrix)   |         | (Fetch Posters)   |
  +-------------------+         +-------------------+
```

## 📂 Folder Structure
```text
CineMatch/
├── backend/
│   ├── model/
│   │   ├── movie_list.pkl       # Serialized Pandas DataFrame
│   │   └── similarity.pkl       # Precomputed Cosine Similarity Matrix
│   ├── app.py                   # Flask Application and Routes
│   ├── recommender.py           # Core ML Recommendation Logic
│   ├── tmdb.py                  # External API Integrations
│   ├── requirements.txt         # Python Dependencies
│   └── .env.example             # Environment Variables Template
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   ├── pages/               # Route Pages (Home, About, NotFound)
│   │   ├── services/            # Axios API Configuration
│   │   ├── App.jsx              # React Router Setup
│   │   └── main.jsx             # React Entry Point
│   ├── package.json             # Node Dependencies
│   ├── tailwind.config.js       # Tailwind Styling Config
│   └── vite.config.js           # Vite Configuration
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Installation Guide

### Prerequisites
- Python 3.8+
- Node.js 16+
- TMDB API Key (Get it from [The Movie Database](https://www.themoviedb.org/))

### 1. Clone the Repository
```bash
git clone https://github.com/Vivek9544/CineMatch.git
cd CineMatch
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
```

### 3. Environment Variables
In the `backend` directory, create a `.env` file from the example:
```bash
cp .env.example .env
```
Inside `.env`, add your API Key:
```text
TMDB_API_KEY=your_api_key_here
```

### 4. Running the Backend
```bash
python app.py
```
*The API will start at http://127.0.0.1:5000*

### 5. Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*The React app will start at http://localhost:5173*

## 🔌 API Endpoints

### `GET /movies`
Returns a list of all available movies in the dataset.
**Response:**
```json
["Avatar", "Interstellar", "..."]
```

### `POST /recommend`
Returns 5 recommended movies based on the input movie title.
**Body:**
```json
{
  "movie": "Avatar"
}
```
**Response:**
```json
[
  {
    "title": "Interstellar",
    "poster": "https://image.tmdb.org/t/p/w500/..."
  }
]
```

## 📸 Screenshots
*(Add your screenshots here)*
- `Home Page`
- `Recommendations Result`

## 🔮 Future Improvements
- Implement Collaborative Filtering for user-specific recommendations.
- Add pagination to the `/movies` endpoint.
- Enhance the UI with dark mode support.
- Containerize the application using Docker.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Vivek9544/CineMatch/issues).

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✍️ Author
**Vivek Thatisetti**
- GitHub: [@Vivek9544](https://github.com/Vivek9544)

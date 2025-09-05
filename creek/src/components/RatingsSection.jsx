import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // lightweight icon package

// API Key and Base URL for TMDb API
const API_KEY = "b91f100e78d4923f752a81397c07ef35";  
const BASE_URL = "https://api.themoviedb.org/3/movie/";

export default function RatingsSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [movies, setMovies] = useState([]);

  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  // Fetching movie details using TMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      const movieIds = [
        550, // Fight Club
        299536, // Avengers: Infinity War
        12345, // Example movieId (replace with real ID)
        278, // The Shawshank Redemption
        238, // The Godfather
        497, // The Dark Knight
        862, // The Godfather: Part II
        680, // Pulp Fiction
        313, // The Lord of the Rings: The Return of the King
        11, // Star Wars: A New Hope
        2941, // Back to the Future
        324, // The Matrix
        424, // The Empire Strikes Back
        961, // Goodfellas
        597, // Interstellar
        136, // The Silence of the Lambs
        400, // The Dark Knight Rises
        122, // Schindler's List
        118, // Forrest Gump
        116, // Inception
        13, // The Departed
        293, // Se7en
        296, // Mad Max: Fury Road
        429, // The Prestige
        4291, // Trainspotting
        38, // Gladiator
        129, // Star Wars: The Force Awakens
        122, // The Lion King
        299534, // Avengers: Endgame
        37724, // The Matrix Resurrections
        297, // Jaws
        99861, // Spider-Man: No Way Home
      ];

      const movieData = await Promise.all(
        movieIds.map(async (id) => {
          const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
          const data = await response.json();
          return data;
        })
      );
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  return (
    <section className="bg-black text-white px-6 py-8 relative">
      <h2 className="text-sm font-bold mb-4 border-b border-gray-700 pb-2">
        CREEKER RATINGS
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scrollable movie cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[300px] h-[200px] md:min-w-[500px] md:h-[300px] rounded-lg overflow-hidden relative cursor-pointer flex-shrink-0"
            onClick={() =>
              navigate(`/reviews/${movie.id}`, { state: { movie } }) // Pass movie data via navigate
            }
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
              <h3 className="text-lg md:text-2xl font-bold">{movie.title}</h3>
              <p className="text-sm md:text-base text-gray-200">
                On My Screen Rate: {movie.vote_average}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

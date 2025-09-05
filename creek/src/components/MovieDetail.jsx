import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// API Key and Base URL for TMDb API
const API_KEY = "b91f100e78d4923f752a81397c07ef35";  
const BASE_URL = "https://api.themoviedb.org/3/movie/";

export default function MovieDetail() {
  const location = useLocation();
  const { movie } = location.state; // Get movie details passed from the card
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(`${BASE_URL}${movie.id}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer");
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl(null);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="bg-black text-white p-8">
      <h2 className="text-3xl font-bebas mb-6">{movie.title}</h2>

      <div className="flex gap-8">
        {/* Movie Poster */}
        <div className="w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full object-contain rounded-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="w-2/3">
          <p className="text-lg"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="text-lg"><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p className="text-lg"><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-4"><strong>Cast:</strong> {movie.cast}</p>

          {/* Trailer */}
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Trailer"
              width="100%"
              height="315"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="mt-4">Trailer not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

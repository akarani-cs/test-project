import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const apiKey = "b91f100e78d4923f752a81397c07ef35"; // TMDb API Key
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular movies URL
const popularMoviesUrl = `${BASE_URL}/movie/popular?api_key=${apiKey}&page=1`;
// Fetch new movies URL (can use 'release_date' filtering)
const newMoviesUrl = `${BASE_URL}/movie/now_playing?api_key=${apiKey}&page=1`;

const TrailersGrid = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Fetch movies from the API
  const fetchMovies = async (url) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const validMovies = data.results.filter((movie) => movie.poster_path); // Filter movies without posters
    setMovies((prevMovies) => [...prevMovies, ...validMovies]); // Append new movies to existing ones
    setLoading(false);
  };

  // Fetch the trailer for a selected movie
  const fetchTrailer = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    const trailer = data.results.find((video) => video.type === "Trailer");
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  };

  // Set selected movie and fetch its trailer
  const handleMovieClick = async (movie) => {
    const trailerUrl = await fetchTrailer(movie.id);
    setSelectedMovie({ ...movie, trailer: trailerUrl });
  };

  // Infinite scroll functionality
  const handleScroll = () => {
    if (scrollRef.current) {
      const bottom =
        scrollRef.current.scrollHeight === scrollRef.current.scrollTop + scrollRef.current.clientHeight;
      if (bottom && !loading) {
        setPage((prevPage) => {
          const newPage = prevPage + 1;
          fetchMovies(`${popularMoviesUrl.split("&page=1")[0]}&page=${newPage}`);
          return newPage;
        });
      }
    }
  };

  // Initialize movie data on page load
  useEffect(() => {
    fetchMovies(popularMoviesUrl); // Fetch popular movies initially
  }, []);

  // scroll event listener
  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <h1 className="text-[5rem] font-extrabold px-12 pt-16">Trailers</h1>

      {/* Movie posters grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-6"
        ref={scrollRef}
        style={{ overflowY: "auto", height: "80vh" }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
              <h3 className="font-bold">{movie.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center text-white">Loading more movies...</div>}

      {/* Modal for trailer */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row items-center justify-center h-full">
              <div className="w-1/2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="w-1/2 px-6 py-4 text-white">
                <h2 className="text-3xl font-bebas mb-4">{selectedMovie.title}</h2>

                {/* Movie Details */}
                <p className="mb-2">
                  <strong>Released:</strong> {selectedMovie.release_date}
                </p>
                <p className="mb-2">
                  <strong>Genre:</strong> {selectedMovie.genres?.map((genre) => genre.name).join(", ")}
                </p>
                <p className="mb-4">
                  <strong>IMDB Rating:</strong> {selectedMovie.vote_average}/10
                </p>
                <p className="mb-6">
                  <strong>Plot:</strong> {selectedMovie.overview}
                </p>

                {/* Trailer embed */}
                {selectedMovie.trailer ? (
                  <iframe
                    src={selectedMovie.trailer}
                    title="Trailer"
                    width="100%"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p className="text-lg">Trailer not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailersGrid;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieIds = [
        "tt3896198", // Guardians of the Galaxy Vol. 2
        "tt1375666", // Inception
        "tt0133093", // The Matrix
        "tt0114369", // Se7en
        "tt0109830", // Forrest Gump
        "tt0110912", // Pulp Fiction
        "tt0120737", // LOTR: Fellowship
        "tt0816692", // Interstellar
        "tt0468569", // The Dark Knight
      ];

      const results = await Promise.all(
        movieIds.map(async (id) => {
          const res = await fetch(
            `http://www.omdbapi.com/?i=${id}&apikey=c2bb0823`
          );
          return res.json();
        })
      );
      setMovies(results);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMovie) return;
      const currentIndex = movies.findIndex(
        (m) => m.imdbID === selectedMovie.imdbID
      );
      if (e.key === "Escape") {
        setSelectedMovie(null);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
        setSelectedMovie(movies[prevIndex]);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % movies.length;
        setSelectedMovie(movies[nextIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMovie, movies]);

  return (
    <div className="w-full relative px-6">
      <h2 className="text-sm font-bold mb-4 border-b border-gray-700 pb-2">
        THE MOVIES I CAN WATCH FOREVER
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {movies.map((movie, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedMovie(movie)}
            className="flex-none w-[380px] h-[220px] cursor-pointer overflow-hidden rounded-xl shadow-md snap-start relative"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 text-white drop-shadow-lg">
              <h3 className="text-lg font-bebas">{movie.Title}</h3>
              <p className="text-sm opacity-80">IMDB: {movie.imdbRating}/10</p>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex">
            <div className="w-2/3 h-full flex items-center justify-center bg-black">
              <img
                src={selectedMovie.Poster}
                alt={selectedMovie.Title}
                className="max-h-[75%] max-w-[75%] object-contain rounded-lg shadow-lg"
              />
              <button
                onClick={() => {
                  const currentIndex = movies.findIndex(
                    (m) => m.imdbID === selectedMovie.imdbID
                  );
                  const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
                  setSelectedMovie(movies[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full px-3 py-1 hover:bg-black/70"
              >
                ‹
              </button>
              <button
                onClick={() => {
                  const currentIndex = movies.findIndex(
                    (m) => m.imdbID === selectedMovie.imdbID
                  );
                  const nextIndex = (currentIndex + 1) % movies.length;
                  setSelectedMovie(movies[nextIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 rounded-full px-3 py-1 hover:bg-black/70"
              >
                ›
              </button>
            </div>
            <div className="w-1/3 p-10 text-white overflow-y-auto scrollbar-hide">
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-5 right-5 text-white text-3xl"
              >
                &times;
              </button>
              <h2 className="text-4xl font-bebas mb-4">
                {selectedMovie.Title}
              </h2>
              <p className="text-sm mb-2">
                <span className="font-semibold">Released:</span> {selectedMovie.Released}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Genre:</span> {selectedMovie.Genre}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Director:</span> {selectedMovie.Director}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Cast:</span> {selectedMovie.Actors}
              </p>
              <p className="text-sm mb-4">
                <span className="font-semibold">IMDB Rating:</span> {selectedMovie.imdbRating}/10
              </p>
              <p className="text-base leading-relaxed opacity-90">
                {selectedMovie.Plot}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGallery;

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Trailers from "./pages/Trailers";
import RatingsSection from "./components/RatingsSection";
import ReviewDetail from "./components/ReviewDetail";
import { AnimatePresence, motion } from "framer-motion";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  const location = useLocation();
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/trailers"
            element={
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Trailers />
              </motion.div>
            }
          />
          <Route
            path="/reviews"
            element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Reviews />
              </motion.div>
            }
          />
          <Route
            path="/ratings"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RatingsSection />
              </motion.div>
            }
          />
            {/* Route for movie details */}
          <Route
            path="/reviews/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieDetail />
              </motion.div>
            }
          />
          <Route
            path="/reviews/:id"
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <ReviewDetail />
              </motion.div>
              
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

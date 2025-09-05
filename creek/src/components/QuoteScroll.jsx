import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

const QuoteScroll = () => {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch movie quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      const fetchedQuotes = [];

      for (let i = 0; i < 5; i++) {
        try {
          const res = await fetch("https://zenquotes.io/api/random");
          const data = await res.json();
          fetchedQuotes.push(data.quote);
        } catch {
          // Fail silently and continue
        }
      }

      setQuotes(fetchedQuotes);
    };

    fetchQuotes();
  }, []);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center text-white p-8">
        No movie quotes available. Please try again later.
      </div>
    );
  }

  const { body: quote, author, tags, movie } = quotes[index];

  return (
    <section className="bg-black text-white p-8 rounded-lg max-w-2xl mx-auto text-center relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-8">THE BEST MOVIE QUOTES EVER</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center items-center px-4"
        >
          <p className="text-3xl font-semibold mb-4">"{quote}"</p>
          <p className="text-sm italic">— {author}, <span className="text-gray-400">{movie || tags.join(', ')}</span></p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prevQuote}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextQuote}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
      >
        <ChevronRight />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2 z-10 relative">
        {quotes.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default QuoteScroll;

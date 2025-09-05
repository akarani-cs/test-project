import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-black text-white px-8 py-4 flex items-center justify-between">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative border-4 border-blue-600 px-4 py-2 font-bold text-lg">
          CREEK
          <div className="absolute left-6 top-full w-0 h-0 border-t-[15px] border-t-blue-600 border-l-[15px] border-l-transparent"></div>
        </div>

        {/* Search */}
        <div className="relative">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-red-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </button>

          {/* Search Input (shown only when active) */}
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute left-8 top-0 bg-black border border-red-500/70 rounded-lg shadow-md text-white px-3 py-1 text-sm focus:outline-none focus:border-red-500 w-44 transition-all duration-200"
              autoFocus
            />
          )}
        </div>
      </div>

      {/* Right: Navigation */}
      <nav className="flex gap-6 font-semibold">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/trailers" className="text-red-600 hover:text-red-400">Trailers</Link>
        <Link to="/reviews" className="hover:text-blue-400">Reviews</Link>
      </nav>
    </header>
  );
}

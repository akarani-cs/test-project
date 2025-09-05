

import React from "react";
import { Link } from "react-router-dom";
import cinemaSeatsBg from "../assets/cinema-seats-still-life.jpg";



const ExploreSection = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${cinemaSeatsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 container mx-auto px-6 flex justify-end items-center min-h-screen">


        {/* Left Image */}
        {/*////removed it*}

        {/* Right Text */}
        <div className="text-right">
          <h2 className="text-4xl font-bold mb-4">
            Explore the Magic
          </h2>
          <p className="text-lg font-semibold leading-relaxed max-w-md ml-auto">
            Discover the enchanting world of cinema at Creek. Immerse yourself
            in captivating movie reviews, exciting trailers, and engaging
            discussions. Let your movie journey begin today!
          </p>

          <br />
            {/* Button */}
            <Link
              to="/reviews"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold inline-block rounded-lg"
            >
              Reviews
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;

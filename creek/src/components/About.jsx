export default function About() {
  return (
    <section className="bg-black text-white pt-12 pb-6">
      {/* Shared Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title + Line */}
        <div className="mb-8">
          <h2 className="text-sm font-bold">ABOUT ME</h2>
          <div className="w-full border-b border-gray-600 mt-2"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="src/assets/man-filming-with-professional-camera-new-movie.jpg"
              alt="Profile"
              className="w-40 sm:w-56 md:w-64 lg:w-72 h-auto object-cover rounded-xl"
            />
          </div>

          {/* About Text - aligned with navbar links */}
          <div className="max-w-lg text-right md:ml-auto">
            <h3 className="text-3xl font-bold mb-2">Hey There! I’m Alvin</h3>
            <p className="text-red-400 font-semibold mb-4">📸Movie bloger/lover📸</p>
            <p className="text-sm text-gray-300 mb-6">
              I’m obsessed with cinema that challenges and electrifies. Christopher Nolan’s mindbending narratives and Quentin Tarantino’s razor sharp dialogue are my lifeblood.  <br /> I crave stories that twist time, explode convention, and leave me dissecting scenes long after the credits roll. For me, movies aren’t just entertainment they’re a playground for obsession.
                
            </p>

            {/* Button */}
            {/*////removed it*/}

            
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-col items-center gap-4 fixed right-4 top-1/2 -translate-y-1/2">
        <a href="https://x.com/" className="text-white hover:text-red-500">🐦</a>
        <a href="https://github.com/" className="text-white hover:text-red-500">📘</a>
        <a href="https://www.instagram.com/" className="text-white hover:text-red-500">📸</a>
      </div>
    </section>
  );
}

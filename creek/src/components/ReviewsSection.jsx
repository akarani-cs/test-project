export default function ReviewsSection() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Heading */}
      <h1 className="text-[5rem] font-extrabold px-12 pt-16">REVIEWS</h1>

      {/* Center message */}
      <div className="flex flex-1 justify-center items-center text-center">
        <div>
          <h2 className="text-xl font-semibold">Check back soon</h2>
          <p className="text-sm text-gray-400 mt-2">
            Once posts are published, you’ll see them here.
          </p>
        </div>
      </div>
    </div>
  );
}

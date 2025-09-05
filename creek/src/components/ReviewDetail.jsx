import { useParams, useNavigate } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Troop Number Eight",
    rating: "6/10",
    description:
      "A war drama that captures the struggles of a battalion navigating survival and loyalty in the face of impossible odds.",
    image:
      "https://images.pexels.com/photos/15824963/pexels-photo-15824963.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Next Man UP",
    rating: "8.5/10",
    description:
      "A sports drama that dives into the resilience of players when unexpected challenges force them to step up.",
    image:
      "https://images.pexels.com/photos/1767016/pexels-photo-1767016.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="p-6 text-center text-white bg-black min-h-screen">
        <p className="text-xl">Movie not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <button
  onClick={() => navigate(-1)}
  className="mb-6 flex items-center text-white font-bold text-2xl hover:opacity-80 transition focus:outline-none active:outline-none"
>
  ←
</button>

      <div className="max-w-4xl mx-auto">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />

        <h1 className="text-3xl font-bold mt-6">{movie.title}</h1>
        <p className="text-lg text-gray-300 mt-2">
          On My Screen Rate: {movie.rating}
        </p>

        <p className="mt-4 text-gray-200 leading-relaxed">
          {movie.description}
        </p>
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';
import Image from 'next/image';
import { Movie } from '../../app/types/Movie';
import { getMovie } from '../../app/services/api/movie';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const movie = await getMovie(id);

  return {
    props: {
      movie,
    },
  };
}

export default function MovieDetails({ movie }: Movie) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Banner Image with Gradient */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-4">
            {new Date(movie.release_date).getFullYear()} | {movie.runtime} min |{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Poster Image */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/logo.png'}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="md:ml-8 md:w-2/3">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Overview</h2>
              <p className="text-lg text-gray-400">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">More Information</h2>
              <ul className="text-lg text-gray-400">
                <li>Budget: ${movie.budget.toLocaleString()}</li>
                <li>Revenue: ${movie.revenue.toLocaleString()}</li>
                <li>Release Date: {new Date(movie.release_date).toLocaleDateString()}</li>
                <li>Rating: {movie.vote_average} / 10</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

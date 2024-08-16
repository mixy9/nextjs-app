import { useRouter } from 'next/router'
import Image from 'next/image'
import { Genre, Movie } from '../../app/types/Movie'
import { getMovie } from '../../app/components/api/movieDetailsApi'
import UiHeartIcon from '../../app/components/ui/UiHeartIcon'

type MovieDetailsProps = {
  movie: Movie
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const movie = (await getMovie(id)) as Movie

  // Format the release date on the server
  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString()

  return {
    props: {
      movie: {
        ...movie,
        formattedReleaseDate,
      },
    },
  }
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen w-full">
      {/* Banner Image */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <p className="text-lg my-4 opacity-75">
            {movie.genres.map((genre: Genre) => genre.name).join(', ')}
          </p>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <div className="flex justify-between items-center">
            <p className="text-lg mt-4">
              {new Date(movie.release_date).getFullYear()} | {movie.runtime} min
            </p>

            {/* Favorite */}
            <div className="md:ml-8 md:w-3/3">
              <UiHeartIcon movie={movie} size={35} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Poster Image */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <Image
              layout="responsive"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/logo.png'
              }
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
                <li>Release Date: {movie.formattedReleaseDate}</li>
                <li>Rating: {movie.vote_average} / 10</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

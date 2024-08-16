import { useRouter } from 'next/router'
import Image from 'next/image'
import { Cast, Genre, Movie } from '../../app/types/movie'
import { getCast, getMovieDetails } from '../../app/api/movieDetailsApi'
import FavoriteMovieBtn from '../../app/components/movie/FavoriteMovieBtn'
import { FC } from 'react'
import Head from 'next/head'

type MovieDetailsProps = {
  movie: Movie
  cast: Cast[]
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const [movieResult, creditsResult] = await Promise.allSettled([
    getMovieDetails(id),
    getCast(id),
  ])

  let movie = null
  let cast = [] as Cast[]

  if (movieResult.status === 'fulfilled') {
    movie = movieResult.value as Movie
  }

  if (creditsResult.status === 'fulfilled') {
    cast = (creditsResult.value || []) as Cast[]
  }

  if (!movie) {
    return {
      notFound: true,
    }
  }

  // Format the release date
  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  return {
    props: {
      movie: {
        ...movie,
        formattedReleaseDate,
      },
      cast,
    },
    revalidate: 60,
  }
}

const MovieDetails: FC<MovieDetailsProps> = ({
  movie,
  cast,
}: MovieDetailsProps) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>{movie.title}</title>
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.overview} />
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </Head>

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
            {movie.genre_ids?.map((genre: Genre) => genre.name).join(', ')}
          </p>
          <div className="flex gap-3">
            <h1 className="text-4xl font-bold max-w-[55%] lg:text-5xl">
              {movie.title}
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg mt-4">
              {new Date(movie.release_date).getFullYear()} | {movie.runtime} min
            </p>

            {/* Favorite */}
            <div className="md:ml-8 md:w-3/3">
              <FavoriteMovieBtn movie={movie} size={35} />
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
                  : '/images/logo.png'
              }
              alt={movie.title}
              width={500}
              height={750}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Global Details */}
          <div className="md:ml-8 md:w-2/3">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Overview</h2>
              <p className="text-lg text-gray-400">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">More Information</h2>
              <ul className="text-lg text-gray-300">
                <li>
                  <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </li>
                <li>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </li>
                <li>
                  <strong>Release Date:</strong> {movie.formattedReleaseDate}
                </li>
                <li>
                  <strong>Rating:</strong> {movie.vote_average} / 10
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-semibold mb-4">Cast</h2>
              <div className="flex flex-wrap">
                {cast?.map((actor) => (
                  <div key={actor.cast_id} className="w-1/4">
                    <div className="flex flex-col items-start">
                      <p className="mt-2 text-left">{actor.name}</p>
                      <p className="text-center text-sm text-gray-500">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

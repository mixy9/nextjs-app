import Image from 'next/image'
import Link from 'next/link'
import FavoriteMovieBtn from './FavoriteMovieBtn'
import { Movie } from '../../types/movie'
import { FC, memo } from 'react'

type MovieCardProps = {
  movie: Movie
}

const MovieCard: FC<MovieCardProps> = memo(({ movie }: MovieCardProps) => {
  const fallbackImageUrl = '/logo.png'
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallbackImageUrl

  const truncatedTitle =
    movie.title.length > 25 ? movie.title.substring(0, 18) + '...' : movie.title

  return (
    <Link
      href={{
        pathname: `/movie-details/[id]`,
        query: { id: movie.id },
      }}
    >
      <div
        className={`relative bg-gray-800 rounded-md flex justify-center items-center overflow-hidden ${
          !movie.poster_path ? 'p-10' : ''
        }
        w-48 h-72
        lg:w-56 lg:h-80`}
      >
        <Image
          className="h-full"
          layout="responsive"
          src={imageUrl}
          alt={truncatedTitle}
          width={226}
          height={354}
          objectFit="cover"
          loading="lazy"
        />
        <div className="absolute m-2 top-0 right-0">
          <FavoriteMovieBtn movie={movie} size={25} />
        </div>
        {!movie.poster_path && (
          <h3 className="text-white text-lg absolute bottom-2 left-3">
            {truncatedTitle}
          </h3>
        )}
      </div>
    </Link>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard

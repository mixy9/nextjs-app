import MovieItem from './MovieCard'
import { Movie } from '../types/Movie'

type MoviesList = {
  movies: Movie[]
}

export default function MovieList({ movies }: MoviesList) {
  if (!movies.length) return null
  return (
    <div className="mt-6 flex flex-wrap w-full justify-center md:justify-between gap-8">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

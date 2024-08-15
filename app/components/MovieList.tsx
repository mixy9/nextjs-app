import MovieItem from './MovieItem'
import { Movie } from '../types/Movie'

type MoviesList = {
  movies: Movie[]
}

export default function MovieList({ movies }: MoviesList) {
  if (!movies.length) return null
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-10">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

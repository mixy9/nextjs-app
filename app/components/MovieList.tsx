import MovieItem from './MovieItem';

export default function MovieList({ movies }) {
  if (!movies.length) return null;
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-5">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

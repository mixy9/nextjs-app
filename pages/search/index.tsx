import { searchMovies } from '../../app/components/api/search'
import { Movie } from '../../app/types/Movie'
import MovieList from '../../app/components/MovieList'
import { GetServerSidePropsContext } from 'next'

type SearchDetailsProps = {
  movies: Movie[]
  query: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context.query

  // If there's no query, return an empty list of movies
  if (!query) {
    return {
      props: {
        movies: [],
        query: null,
      },
    }
  }

  let movies: Movie[] | undefined = []
  try {
    movies = await searchMovies(query as string)
    // Log the result for debugging
    console.log('Movies returned from API:', movies)
  } catch (error) {
    console.error('Failed to fetch movies:', error)
  }

  return {
    props: {
      movies: movies || [],
      query: query || null,
    },
  }
}

export default function SearchDetails({ movies, query }: SearchDetailsProps) {
  return (
    <div>
      <h1>Search Results for {query || 'your search'}</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <div>No results found</div>
      )}
    </div>
  )
}

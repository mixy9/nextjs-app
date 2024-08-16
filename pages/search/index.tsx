import { searchMoviesApi } from '../../app/api/searchMoviesApi'
import { Movie } from '../../app/types/movie'
import { GetServerSidePropsContext } from 'next'
import MovieCard from '../../app/components/movie/MovieCard'

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
    movies = await searchMoviesApi(query as string)
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

const SearchDetails = ({ movies, query }: SearchDetailsProps) => {
  return (
    <div>
      <h1>Search Results for {query || 'your search'}</h1>
      {movies.length > 0 ? (
        <div className="mt-6 flex flex-wrap w-full justify-center md:justify-between gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  )
}

export default SearchDetails

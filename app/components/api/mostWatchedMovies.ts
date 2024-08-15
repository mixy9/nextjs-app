import api from './api'
import { Movie } from '../../app/types/Movie'

export type MostWatchedMoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

type MostWatchedMoviesParams = {
  page: number
  releaseYear?: number
  rating?: number
  genres?: string
}

export const mostWatchedMoviesFilter = async ({
  page,
  releaseYear,
  rating,
  genres,
}: MostWatchedMoviesParams): Promise<MostWatchedMoviesResponse | unknown> => {
  try {
    const response = await api.get<MostWatchedMoviesResponse>(
      '/discover/movie',
      {
        params: {
          sort_by: 'popularity.asc',
          page,
          primary_release_year: releaseYear,
          'vote_average.gte': rating,
          'vote_average.lte': rating,
          with_genres: genres,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching most watched movies', error)
  }
}

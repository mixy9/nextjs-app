import api from './api'
import { MoviesList } from '../types/movie'

type Filters = {
  releaseYear?: number
  rating: number
  genres?: string
}

export type MostWatchedMoviesParams = {
  filters: Filters
  page?: number
}

export const getMostWatchedMovies = async ({
  filters,
  page = 1,
}: MostWatchedMoviesParams): Promise<MoviesList | unknown> => {
  try {
    const response = await api.get<MoviesList>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        page,
        release_year: filters.releaseYear,
        'vote_average.gte': filters.rating,
        'vote_average.lte': filters.rating,
        with_genres: filters.genres,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching most watched movies', error)
  }
}

import api from './api'
import { Movie } from '../../types/Movie'
import { MoviesListResponse } from '../../types/Response'

type Filters = {
  releaseYear?: number
  rating?: number
  genres?: string
}

type MostWatchedMoviesParams = {
  filters?: Filters | null
  page?: number
}

export const mostWatchedMoviesFilter = async ({
  filters = null,
  page = 1,
}: MostWatchedMoviesParams): Promise<MoviesListResponse | unknown> => {
  try {
    const response = await api.get<MoviesListResponse>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        page,
        primary_release_year: filters.releaseYear ?? '',
        'vote_average.gte': filters.rating ?? null,
        'vote_average.lte': filters.rating ?? null,
        with_genres: filters.genres ?? null,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching most watched movies', error)
  }
}

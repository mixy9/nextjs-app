import { Movie } from '../../types/Movie'
import api from './api'
import { MoviesListResponse } from '../../types/Response'

export const searchMovies = async (
  searchQuery: string
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesListResponse>('/search/movie', {
      params: {
        query: searchQuery,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies', error)
  }
}

import { Movie } from '../types/movie'
import api from './api'
import { MoviesList } from '../types/movie'

export const searchMoviesApi = async (
  searchQuery: string
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesList>('/search/movie', {
      params: {
        query: searchQuery,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies', error)
  }
}

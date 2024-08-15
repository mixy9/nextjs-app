import { Movie } from '../../app/types/Movie'
import api from './api'

type SearchMovies = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const searchMovies = async (searchQuery: string): Promise<Movie[]> => {
  try {
    const response = await api.get<SearchMovies>('/search/movie', {
      params: {
        query: searchQuery,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies', error)
  }
}

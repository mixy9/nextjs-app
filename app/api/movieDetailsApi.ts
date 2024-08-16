import { Movie } from '../types/movie'
import api from './api'

export const getMovieDetails = async (
  movieId: string
): Promise<Movie | unknown> => {
  try {
    const response = await api.get<Movie>(`/movie/${movieId}`, {})

    return response.data
  } catch (error) {
    console.error('Error fetching movie-details', error)
  }
}

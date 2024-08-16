import { Cast, Credits, Movie } from '../types/movie'
import api from './api'

export const getMovieDetails = async (
  movieId: string
): Promise<Movie | unknown> => {
  try {
    const response = await api.get<Movie>(`/movie/${movieId}`, {})

    return response.data
  } catch (error) {
    console.error('Error fetching movie details', error)
  }
}

export const getCast = async (movieId: string): Promise<Cast[] | unknown> => {
  try {
    const response = await api.get<Credits>(`/movie/${movieId}/credits`, {})

    return response.data.cast
  } catch (error) {
    console.error('Error fetching cast', error)
  }
}

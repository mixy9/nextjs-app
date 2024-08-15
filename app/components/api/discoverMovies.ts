import api from './api'
import { Genre, Movie, Provider } from '../../types/Movie'
import {
  GenresListResponse,
  MoviesListResponse,
  ProvidersListResponse,
} from '../../types/Response'

export const getNewestMovies = async (
  page: number
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesListResponse>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc',
        page,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching newest movies', error)
  }
}

export const getGenres = async (): Promise<Genre[] | undefined> => {
  try {
    const response = await api.get<GenresListResponse>('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Error fetching genres list', error)
  }
}

export const getProviders = async (): Promise<Provider[] | undefined> => {
  try {
    const response = await api.get<ProvidersListResponse>(
      '/watch/providers/movie'
    )
    return response.data.results
  } catch (error) {
    console.error('Error fetching genres list', error)
  }
}

export const discoverMoviesByGenres = async (
  genreId: number,
  page: number
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesListResponse>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        with_genres: genreId,
        page,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching discovered movies by genres', error)
  }
}

export const discoverMoviesByProviders = async (
  providerId: number,
  page: number
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesListResponse>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        with_watch_providers: providerId,
        page,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching discovered movies by genres', error)
  }
}

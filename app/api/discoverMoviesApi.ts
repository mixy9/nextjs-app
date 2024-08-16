import api from './api'
import { Genre, Movie, Provider } from '../types/movie'
import { GenresList, MoviesList, ProvidersList } from '../types/movie'

export const getNewestMovies = async (
  page: number
): Promise<Movie[] | undefined> => {
  try {
    const response = await api.get<MoviesList>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc&popularity.asc',
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
    const response = await api.get<GenresList>('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Error fetching genres list', error)
  }
}

export const getProviders = async (): Promise<Provider[] | undefined> => {
  try {
    const response = await api.get<ProvidersList>('/watch/providers/movie')
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
    const response = await api.get<MoviesList>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc&popularity.asc',
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
    const response = await api.get<MoviesList>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc&popularity.asc',
        with_watch_providers: providerId,
        page,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching discovered movies by genres', error)
  }
}

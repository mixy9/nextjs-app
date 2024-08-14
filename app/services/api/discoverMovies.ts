import api from '../api';
import { Movie } from '../../types/Movie';

type DiscoverMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getNewestMovies = async (page: number): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMovies>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching newest movies', error);
  }
};

export const getGenres = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres list', error);
  }
};

export const getProviders = async (): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMovies>('/watch/providers/movie');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres list', error);
  }
};

export const discoverMoviesByGenres = async (genreId: string, page: number): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMovies>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        with_genres: genreId,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching discovered movies by genres', error);
  }
};

export const discoverMoviesByProviders = async (providerId: string, page: number): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMovies>('/discover/movie', {
      params: {
        sort_by: 'popularity.asc',
        with_watch_providers: providerId,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching discovered movies by genres', error);
  }
};

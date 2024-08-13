import api from '../api';

type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
}

type DiscoverMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const newestMovies = async (page: number): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMoviesResponse>('/discover/movie', {
      params: {
        sort_by: 'release_date.asc',
        primary_release_date_lte: 'YYYY-MM-DD',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching newest movies', error);
    throw error;
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
    const response = await api.get<DiscoverMoviesResponse>('/watch/providers/movie');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres list', error);
  }
};

export const discoverMoviesByGenres = async (genreId: string, page: number): Promise<Movie[]> => {
  try {
    const response = await api.get<DiscoverMoviesResponse>('/discover/movie', {
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
    const response = await api.get<DiscoverMoviesResponse>('/discover/movie', {
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

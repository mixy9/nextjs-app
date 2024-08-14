import { Movie } from '../../types/Movie';
import api from '../api';

export const getMovie = async (movieId: string): Promise<Movie | unknown> => {
  try {
    const response = await api.get<Movie>(`/movie/${movieId}`, {
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movie', error);
  }
};

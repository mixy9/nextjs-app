import { Genre, Movie } from './Movie'

export type MoviesListResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type GenresListResponse = {
  genres: Genre[]
}

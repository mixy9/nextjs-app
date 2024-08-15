import { Genre, Movie, Provider } from './Movie'

export type MoviesListResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type ProvidersListResponse = {
  page: number
  results: Provider[]
  total_pages: number
  total_results: number
}

export type GenresListResponse = {
  genres: Genre[]
}

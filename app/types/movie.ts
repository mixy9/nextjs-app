export type Movie = {
  id: number
  title: string
  backdrop_path: string
  poster_path: string | null
  overview: string
  release_date: string
  runtime: number
  genre_ids: Genre[]
  budget: number
  revenue: number
  vote_average: number
  formattedReleaseDate?: string
}

export type Genre = {
  id: number
  name: string
}

export type Provider = {
  logo_path: string
  provider_name: string
  provider_id: number
}

export type FavoriteMovie = Pick<Movie, 'id' | 'title'>

export type MoviesList = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type ProvidersList = {
  page: number
  results: Provider[]
  total_pages: number
  total_results: number
}

export type GenresList = {
  genres: Genre[]
}

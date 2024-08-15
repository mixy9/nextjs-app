export type Movie = {
  id: number
  title: string
  backdrop_path: string
  poster_path: string | null
  overview: string
  release_date: string
  runtime: number
  genres: Genre[]
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

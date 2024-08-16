import React, { FC } from 'react'
import {
  discoverMoviesByGenres,
  discoverMoviesByProviders,
  getGenres,
  getProviders,
  getNewestMovies,
} from '../app/api/discoverMoviesApi'
import UiHorizontalList from '../app/components/ui/UiHorizontalList'
import Link from 'next/link'
import UiButton from '../app/components/ui/UiButton'
import { Movie, Genre, Provider } from '../app/types/movie'
import MovieProviderTabs from '../app/components/MovieProviderTabs'
import MovieCard from '../app/components/movie/MovieCard'

type HomeProps = {
  initialNewestMovies: Movie[]
  initialGenres: Genre[]
  initialProviders: Provider[]
  moviesByGenre: Record<string, Movie[]>
  moviesByProvider: Record<string, Movie[]>
}

export async function getServerSideProps() {
  try {
    const initialNewestMoviesPromise = getNewestMovies(1)
    const initialGenresPromise = getGenres()
    const initialProvidersPromise = getProviders()

    const [
      initialNewestMoviesResult,
      initialGenresResult,
      initialProvidersResult,
    ] = await Promise.allSettled([
      initialNewestMoviesPromise,
      initialGenresPromise,
      initialProvidersPromise,
    ])

    const initialNewestMovies: Movie[] =
      initialNewestMoviesResult.status === 'fulfilled'
        ? (initialNewestMoviesResult.value as Movie[])
        : []
    const initialGenres: Genre[] =
      initialGenresResult.status === 'fulfilled'
        ? (initialGenresResult.value as Genre[])
        : []
    const initialProviders: Provider[] =
      initialProvidersResult.status === 'fulfilled'
        ? (initialProvidersResult.value as Provider[])
        : []

    // Fetch movies by genres
    const moviesByGenreResults = await Promise.allSettled(
      initialGenres
        .slice(0, 5)
        .map((genre: Genre) => discoverMoviesByGenres(genre.id, 1))
    )

    const moviesByGenre: Record<string, Movie[]> = {}
    moviesByGenreResults.forEach((result, index: number) => {
      if (result.status === 'fulfilled') {
        moviesByGenre[initialGenres[index].name] = result.value as Movie[]
      }
    })

    // Fetch movies by providers
    const moviesByProviderResults = await Promise.allSettled(
      initialProviders
        .slice(0, 8)
        .map((provider: Provider) =>
          discoverMoviesByProviders(provider.provider_id, 1)
        )
    )

    const moviesByProvider: Record<string, Movie[]> = {}
    moviesByProviderResults.forEach((result, index: number) => {
      if (result.status === 'fulfilled') {
        moviesByProvider[initialProviders[index].provider_name] = (
          result.value as Movie[]
        ).slice(0, 3)
      }
    })

    console.log(moviesByProvider)

    return {
      props: {
        initialNewestMovies: initialNewestMovies.slice(0, 13),
        initialGenres: initialGenres.slice(0, 10),
        initialProviders: initialProviders.slice(0, 8),
        moviesByGenre,
        moviesByProvider,
      },
    }
  } catch (error) {
    return {
      props: {
        initialNewestMovies: [],
        initialGenres: [],
        initialProviders: [],
        moviesByGenre: {},
        moviesByProvider: {},
      },
    }
  }
}

const Home: FC<HomeProps> = ({
  initialNewestMovies,
  moviesByGenre,
  moviesByProvider,
}: HomeProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="h-auto flex flex-col items-center justify-center p-20 lg:p-36">
        <h1 className="text-4xl font-bold m-3 text-center lg:text-6xl">
          Best Site To Watch
          <br />
          <span className="font-semibold text-7xl text-cyan-500 lg:text-8xl">
            Movies
          </span>
        </h1>

        <p className="p-10 lg:text-2xl">
          Your guide to streaming movies, TV series and sports
        </p>
        <UiButton size="2xl">
          <Link href="/most-watched">Most Watched Movies</Link>
        </UiButton>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5">
        <h2 className="text-3xl font-bold pb-3">Newest Movies</h2>
        <UiHorizontalList>
          {initialNewestMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </UiHorizontalList>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-10">
        <MovieProviderTabs moviesByProvider={moviesByProvider} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10">
        {Object.keys(moviesByGenre).map((genreName) => (
          <div key={genreName}>
            <h2 className="text-3xl pb-5">{genreName} Movies</h2>
            <UiHorizontalList>
              {moviesByGenre[genreName].map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </UiHorizontalList>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

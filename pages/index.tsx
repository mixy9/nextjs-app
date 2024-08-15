import React from 'react'
import MovieItem from '../app/components/MovieItem'
import {
  discoverMoviesByGenres,
  discoverMoviesByProviders,
  getGenres,
  getProviders,
  getNewestMovies,
} from '../app/components/api/discoverMovies'
import MovieHorizontalList from '../app/components/MovieHorizontalList'
import Link from 'next/link'
import UiButton from '../app/components/ui/UiButton'
import { Movie, Genre, Provider } from '../app/types/Movie'

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
        .slice(0, 5)
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

    return {
      // TODO: save max number to constants
      props: {
        initialNewestMovies: initialNewestMovies.slice(0, 13),
        initialGenres: initialGenres.slice(0, 10),
        initialProviders: initialProviders.slice(0, 5),
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

export default function Home({
  initialNewestMovies,
  moviesByGenre,
  moviesByProvider,
}: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-8">
      <div className="h-auto flex flex-col items-center justify-center p-36">
        <h1 className="text-6xl font-bold m-3 text-center">
          The Best Site To Watch
          <br />
          <span className="font-semibold text-8xl text-cyan-500">Movies</span>
        </h1>

        <p className="p-10 text-2xl">
          Your guide to streaming movies, TV series and sports
        </p>

        <Link href="/most-watched">
          <UiButton name="Most Watched Movies" size="lg" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
        <h2 className="text-3xl font-bold pb-3">Newest Movies</h2>
        <MovieHorizontalList movies={initialNewestMovies} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-10">
        {Object.keys(moviesByProvider).map((providerName) => (
          <div key={providerName}>
            <h2 className="text-3xl pb-5">{providerName} Movies</h2>
            <div className="gap-5 flex">
              {moviesByProvider[providerName].map((movi) => (
                <MovieItem movie={movi} key={movi.id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-10">
        {Object.keys(moviesByGenre).map((genreName) => (
          <div key={genreName}>
            <h2 className="text-3xl pb-5">{genreName} Movies</h2>
            <MovieHorizontalList movies={moviesByGenre[genreName]} />
          </div>
        ))}
      </div>
    </div>
  )
}

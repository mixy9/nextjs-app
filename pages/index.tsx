'use client';

import React from 'react';
import useSWR from 'swr';
import MovieItem from '../app/components/MovieItem';
import {
  discoverMoviesByGenres,
  discoverMoviesByProviders,
  getGenres,
  getProviders,
  getNewestMovies,
} from '../app/services/api/discoverMovies';
import MovieHorizontalList from '../app/components/MovieHorizontalList';

export default function Home({ initialNewestMovies, initialGenres, initialProviders }) {
  // Fetch new movies with SWR and revalidate on client side
  const { data: newestMovies } = useSWR('/api/newest-movies', () => getNewestMovies(1), {
    initialData: initialNewestMovies,
    revalidateOnFocus: false,
  });

  // Fetch genres with SWR and revalidate on client side
  const { data: genres } = useSWR('/api/genres', getGenres, {
    initialData: initialGenres,
    revalidateOnFocus: false,
  });

  // Fetch providers with SWR and revalidate on client side
  const { data: providers } = useSWR('/api/providers', getProviders, {
    initialData: initialProviders,
    revalidateOnFocus: false,
  });

  // Fetch movies by genre
  const { data: moviesByGenre } = useSWR(
    genres ? ['/api/movies-by-genre', genres] : null,
    () => {
      const fetchMovies = async () => {
        const moviesMap = {};
        for (const genre of genres.slice(0, 5)) {
          moviesMap[genre.name] = await discoverMoviesByGenres(genre.id, 1);
        }
        return moviesMap;
      };
      return fetchMovies();
    },
    { revalidateOnFocus: false }
  );

  // Fetch movies by provider
  const { data: moviesByProvider } = useSWR(
    providers ? ['/api/movies-by-provider', providers] : null,
    () => {
      const fetchMovies = async () => {
        const moviesMap = {};
        for (const provider of providers.slice(0, 5)) {
          const data = await discoverMoviesByProviders(provider.provider_id, 1);
          moviesMap[provider.provider_name] = data.slice(0, 3);
        }
        return moviesMap;
      };
      return fetchMovies();
    },
    { revalidateOnFocus: false }
  );

  if (!newestMovies || !genres || !providers || !moviesByGenre || !moviesByProvider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold m-3">Newest Movies</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
        <MovieHorizontalList movies={newestMovies} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
        {Object.keys(moviesByProvider).map((providerName) => (
          <div key={providerName}>
            <h2>{providerName} Movies</h2>
            <div className="gap-5 flex">
              {moviesByProvider[providerName].map((movi) => (
                <MovieItem movie={movi} key={movi.id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
        {Object.keys(moviesByGenre).map((genreName) => (
          <div key={genreName}>
            <h2>{genreName} Movies</h2>
            <MovieHorizontalList movies={moviesByGenre[genreName]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialNewestMovies = await getNewestMovies(1);
    const initialGenres = await getGenres();
    const initialProviders = await getProviders();

    return {
      props: {
        initialNewestMovies: initialNewestMovies.slice(0, 10),
        initialGenres: initialGenres.slice(0, 10),
        initialProviders: initialProviders.slice(0, 5),
      },
    };
  } catch (error) {
    return {
      props: {
        initialNewestMovies: [],
        initialGenres: [],
        initialProviders: [],
      },
    };
  }
}

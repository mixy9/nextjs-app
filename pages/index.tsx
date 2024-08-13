'use client';

import Layout from '../app/components/Layout';
import React, { useEffect, useState } from 'react';
import MovieList from '../app/components/MovieList';
import MovieItem from '../app/components/MovieItem';
import {
  discoverMoviesByGenres,
  discoverMoviesByProviders,
  getGenres,
  getProviders,
  newestMovies,
} from '../app/services/api/discoverMovies';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [moviesByProvider, setMoviesByProvider] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await newestMovies(1);
        setMovies(data.slice(0, 10));
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        setError('Failed to load genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenresList();
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const moviesMap = {};
        for (const genre of genres) {
          moviesMap[genre.name] = await discoverMoviesByGenres(genre.id, 1);
        }

        setMoviesByGenre(moviesMap);
      } catch (error) {
        setError('Failed to load movies by genres');
      } finally {
        setLoading(false);
      }
    };

    if (genres.length > 0) {
      fetchMoviesByGenre();
    }
  }, [genres]);

  useEffect(() => {
    const fetchProvidersList = async () => {
      try {
        const data = await getProviders();
        setProviders(data.slice(0, 5));
      } catch (err) {
        setError('Failed to load providers list');
      } finally {
        setLoading(false);
      }
    };

    fetchProvidersList();
  }, []);

  useEffect(() => {
    const fetchMoviesByProvider = async () => {
      try {
        const moviesMap = {};
        for (const provider of providers) {
          const data = await discoverMoviesByProviders(provider.provider_id,1);
          moviesMap[provider.provider_name] = data.slice(0, 3);
        }
        console.log(moviesMap, 'moviesMap');

        setMoviesByProvider(moviesMap);
      } catch (error) {
        setError('Failed to load movies by providers');
      } finally {
        setLoading(false);
      }
    };

    if (providers.length > 0) {
      fetchMoviesByProvider();
    }
  }, [providers]);

  return (
    <Layout home>
      <div className="text-white">
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-6xl font-bold m-3">Newest Movies</h1>

          <MovieList movies={movies} />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
            {Object.keys(moviesByProvider).map((providerName) => (
              <div key={providerName}>
                <h2>{providerName} Movies</h2>
                <div className="gap-5 flex">
                  {moviesByProvider[providerName].map((movi) => (
                    <MovieItem movie={movi} key={movi} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
            {Object.keys(moviesByGenre).map((genreName) => (
              <div key={genreName}>
                <h2>{genreName} Movies</h2>
                <div className="gap-5 flex">
                  {moviesByGenre[genreName].map((movie) => (
                    <MovieItem movie={movie} key={movie} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/*<MovieHorizontalList />*/}
        </main>
      </div>
    </Layout>
  );
}

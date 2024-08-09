'use client'

import Layout from "../app/components/Layout";
import utilStyles from '../app/styles/utils.module.css';
import React, { useEffect, useState } from "react";
import MovieList from "../app/components/MovieList";
import MovieItem from "../app/components/MovieItem";

export const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIES_BY_GENRE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=a300ecd09165adc9d5756bea72c8642c&sort_by=popularity.asc&language=en-US&with_genres=`;
const MOVIES_BY_PROVIDER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=a300ecd09165adc9d5756bea72c8642c&sort_by=popularity.asc&language=en-US&with_watch_providers=`;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [providers, setProviders] = useState([]);
    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [moviesByProvider, setMoviesByProvider] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}/discover/movie?api_key=a300ecd09165adc9d5756bea72c8642c&language=en-US&sort_by=release_date.desc&primary_release_date.lte=YYYY-MM-DD&page=1`)
            .then((response) => response.json())
            .then((data) => setMovies(data.results))
            .catch((error) => console.error('Error fetching NowPlaying most-watched', error))
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/watch/providers/movie?api_key=a300ecd09165adc9d5756bea72c8642c`)
            .then((response) => response.json())
            .then((data) => setProviders(data.results.slice(0, 3)))
            .catch((error) => console.error('Error fetching NowPlaying most-watched', error))
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/genre/movie/list?api_key=a300ecd09165adc9d5756bea72c8642c`)
            .then((response) => response.json())
            .then((data) => setGenres(data.genres.slice(0, 10)))
            .catch((error) => console.error('Error fetching genres', error))
    }, [])

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const moviesMap = {};
                for (const genre of genres) {
                    const response = await fetch(`${MOVIES_BY_GENRE_URL}${genre.id}`);
                    const data = await response.json();
                    moviesMap[genre.name] = data.results;
                }
                console.log(moviesMap, 'moviesMap')

                setMoviesByGenre(moviesMap);
            } catch (error) {
                console.error('Error fetching most-watched by genre:', error);
            }
        };

        if (genres.length > 0) {
            fetchMoviesByGenre();
        }
    }, [genres]);

    useEffect(() => {
        const fetchMoviesByProvider = async () => {
            try {
                const moviesMap = {};
                for (const provider of providers) {
                    const response = await fetch(`${MOVIES_BY_PROVIDER_URL}${provider.provider_id}`);
                    const data = await response.json();
                    moviesMap[provider.provider_name] = data.results.slice(0, 3);
                }
                console.log(moviesMap, 'moviesMap')

                setMoviesByProvider(moviesMap);
            } catch (error) {
                console.error('Error fetching most-watched by genre:', error);
            }
        };

        if (providers.length > 0) {
            fetchMoviesByProvider();
        }
    }, [providers]);

    return (
        <Layout home>
            <div className={`text-white ${utilStyles.headingMd}`}>
                <main className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1 className="text-6xl font-bold m-3">Newest Movies</h1>

                    <MovieList movies={movies}/>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
                        {Object.keys(moviesByProvider).map((providerName) => (
                            <div key={providerName}>
                                <h2>{providerName} Movies</h2>
                                <div className="gap-5 flex">
                                    {moviesByProvider[providerName].map((movi) => (
                                        <MovieItem
                                            movie={movi}
                                            key={movi}
                                        />
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
                                        <MovieItem
                                            movie={movie}
                                            key={movie}
                                        />
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


import Head from 'next/head';
import Layout from '../../app/components/Layout';
import React, { useState } from 'react';
import MovieList from '../../app/components/MovieList';
import InfiniteScrollObserver from '../../app/components/InfiniteScrollObserver';
import { BASE_URL } from '../index';

const MOVIES_URL = `${BASE_URL}/discover/movie?api_key=a300ecd09165adc9d5756bea72c8642c&sort_by=popularity.asc&language=en-US&page=`;

export default function MostWatched({
  initialMovies,
  initialPage,
  totalPages,
}) {
  const [mostWatchedMovies, setMostWatchedMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < totalPages);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const fetchMovies = debounce(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    fetch(`${MOVIES_URL}${page + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setMostWatchedMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(page + 1 < data.total_pages);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching most-watched movies', error);
        setIsLoading(false);
      });
  }, 300);

  return (
    <Layout>
      <Head>
        <title>Most Watched Movies</title>
      </Head>
      <h1 className="text-6xl font-bold mx-auto">Most Watched Movies</h1>
      <MovieList movies={mostWatchedMovies} />
      <InfiniteScrollObserver onIntersect={fetchMovies} />
      {isLoading && <p>Loading...</p>}
    </Layout>
  );
}

// This function runs on the server and provides the initial movies data
export async function getServerSideProps() {
  // This function runs on the server before the page is rendered, fetching the initial batch of movies.
  // It passes the initial movies, page number, and total pages as props to the MostWatched component.
  const res = await fetch(`${MOVIES_URL}1`);
  const data = await res.json();

  return {
    props: {
      initialMovies: data.results, // Initial set of movies
      initialPage: data.page, // Initial page number
      totalPages: data.total_pages, // Total number of pages available
    },
  };
}

'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import useSWR from 'swr';
import MovieList from '../../app/components/MovieList';
import InfiniteScrollObserver from '../../app/components/InfiniteScrollObserver';
import Slider from '../../app/components/Slider';
import GenresFilterDropdown from '../../app/components/GenresFilterDropdown';
import { mostWatchedMoviesFilter, MostWatchedMoviesResponse } from '../../app/services/api/mostWatchedMovies';
import { Movie } from '../../app/types/Movie';

type MostWatchedProps = {
  initialMovies: Movie[];
  initialPage: number;
  totalPages: number;
}

export default function MostWatched({ initialMovies, initialPage, totalPages }: MostWatchedProps) {
  const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);
  const [ratingGte, setRatingGte] = useState<number | undefined>(undefined);
  const [ratingLte, setRatingLte] = useState<number | undefined>(undefined);
  const [genres, setGenres] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(initialPage);

  const filters = {
    page,
    releaseYear,
    ratingGte,
    ratingLte,
    genres,
  };

  const { data, error, isValidating, mutate } = useSWR<MostWatchedMoviesResponse>(
    ['/api/most-watched', filters],
    () => mostWatchedMoviesFilter(filters),
    {
      fallbackData: { results: initialMovies, page: initialPage, total_pages: totalPages },
    }
  );

  const handleReleaseYearChange = (value: number) => {
    setReleaseYear(value);
    setPage(1); // Reset page to 1 on filter change
    mutate(); // Re-fetch with new filters
  };

  const handleRatingChange = (value: number) => {
    setRatingGte(value);
    setPage(1);
    mutate();
  };

  const handleGenresChange = (selectedGenres: string[]) => {
    setGenres(selectedGenres.join(','));
    setPage(1);
    mutate();
  };

  const loadMoreMovies = () => {
    if (isValidating || !data || page >= data.total_pages) return;
    setPage(prevPage => prevPage + 1);
    mutate(); // Re-fetch the data with the updated page number
  };

  if (error) return <div>Failed to load movies</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Most Watched Movies</title>
      </Head>
      <h1 className="text-6xl font-bold mx-auto">Most Watched Movies</h1>

      <GenresFilterDropdown onValueChange={handleGenresChange} />
      <Slider min={1970} max={2024} step={1} onValueChange={handleReleaseYearChange} />
      <Slider min={1} max={10} step={0.5} onValueChange={handleRatingChange} />

      <MovieList movies={data.results} />
      <InfiniteScrollObserver onIntersect={loadMoreMovies} />
      {isValidating && <p>Loading...</p>}
    </div>
  );
}

export async function getServerSideProps() {
  const data = await mostWatchedMoviesFilter({ page: 1 });

  return {
    props: {
      initialMovies: data.results,
      initialPage: data.page,
      totalPages: data.total_pages,
    },
  };
}

// 1. Initial Data Fetching
//
// Server-Side Rendering (SSR): The getServerSideProps function fetches the initial data when the page is loaded. This
// ensures that when the user first visits the page, they see a pre-rendered list of the most-watched movies with the
// first page of results.
//
// 2. Live Updates with Filters
//
//   SWR with mutate: The SWR hook manages data fetching on the client side. When a user interacts with the filters
//   (e.g., changes the release year, rating, or genres), the mutate function is called. This triggers SWR to refetch
//   the data with the new filters applied.
//   Reactivity: Since the filters are stored in React state (releaseYear, ratingGte, ratingLte, genres), any change in
//   these states will cause the page to be reset to 1 and a new request to be sent using the updated filters.
//
// 3. Pagination and Infinite Scroll
//
// Initial Page Load: When the page loads, SWR uses the initial data provided by getServerSideProps. It will then keep
// the data up to date by refetching it if necessary (for instance, if the user scrolls and triggers infinite scrolling).
// Loading More Data: The loadMoreMovies function increments the page and triggers a refetch to load additional pages
// of data. Since SWR is managing the fetches, it handles appending new data to the existing list smoothly.
//
//   Detailed Flow:
//
//   Initial Page Load:
//   getServerSideProps fetches the initial set of movies.
//   SWR uses this data as fallbackData, ensuring that the initial page is displayed quickly and that the client-side
//   has data to start with.
//
// Filter Changes:
//   When a user changes any filter, the respective state is updated (setReleaseYear, setRatingGte, setRatingLte,
//   setGenres).
//   The page state is reset to 1 to ensure a fresh fetch of the first page with the new filters.
// mutate() is called to trigger SWR to fetch data based on the new filters.
//
// Data Fetching:
//   SWR calls the mostWatchedMoviesFilter function, which fetches data from the API with the current filters applied.
//   The component re-renders with the updated movie list.
//
//   Infinite Scroll:
//   When the user scrolls down, loadMoreMovies is called.
//   This increments the page state and refetches the next page of results, appending them to the existing list.
//
//   Summary
//
// With this setup:
//
//   The initial data is fetched server-side to ensure fast loading and good SEO.
//   Filters are applied live, and the data is refetched and updated immediately in the UI when the user interacts with
//   the filters.
//   Infinite scrolling works seamlessly, allowing users to load more results as they scroll down.
//
//   Everything should work smoothly with live updates, ensuring a responsive and dynamic user experience.
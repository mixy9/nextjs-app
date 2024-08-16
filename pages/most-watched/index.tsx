'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import InfiniteScrollObserver from '../../app/components/InfiniteScrollObserver'
import MovieFilters from '../../app/components/MovieFilters'
import { Movie } from '../../app/types/movie'
import { useDebounce } from '../../app/useDebounce'
import {
  getMostWatchedMovies,
  MostWatchedMoviesParams,
} from '../../app/api/mostWatchedMoviesApi'
import { MoviesList } from '../../app/types/movie'
import MovieCard from '../../app/components/movie/MovieCard'

const MostWatched = memo(() => {
  const [page, setPage] = useState<MoviesList['page']>(1)
  const [filters, setFilters] = useState<{
    releaseYear?: number
    rating?: number
    genres?: string
  }>({})
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState<number>(0)

  const debouncedFilters = useDebounce(filters, 300)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const data = (await getMostWatchedMovies({
        filters: debouncedFilters,
        page,
      } as MostWatchedMoviesParams)) as MoviesList
      if (page === 1) {
        setMovies(
          data.results.filter(
            (movie) => movie.release_date && movie.genre_ids.length
          )
        )
      } else {
        setMovies((prevMovies) => [
          ...prevMovies,
          ...data.results.filter(
            (movie) => movie.release_date && movie.genre_ids.length
          ),
        ])
      }
      setTotalPages(data.total_pages)
      setLoading(false)
    }

    fetchMovies()
  }, [debouncedFilters, page])

  const handleFiltersChange = useCallback(
    (newFilters: {
      releaseYear?: number
      rating?: number
      genres?: string
    }) => {
      setFilters((prevFilters) => {
        if (
          prevFilters.releaseYear !== newFilters.releaseYear ||
          prevFilters.rating !== newFilters.rating ||
          prevFilters.genres !== newFilters.genres
        ) {
          setPage(1)
          return newFilters
        }
        return prevFilters
      })
    },
    []
  )

  const loadMoreMovies = () => {
    if (loading || page >= totalPages) return
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="flex flex-col py-2 mt-20 w-full">
      <MovieFilters onFiltersChange={handleFiltersChange} />

      <div className="mt-6 flex flex-wrap w-full justify-center md:justify-between gap-8">
        {movies ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies available.</p>
        )}
      </div>
      {page < totalPages && (
        <InfiniteScrollObserver onIntersect={loadMoreMovies} />
      )}

      {page < totalPages && (
        <InfiniteScrollObserver onIntersect={loadMoreMovies} />
      )}

      {loading && <p>Loading...</p>}
    </div>
  )
})

MostWatched.displayName = 'MostWatched'

export default MostWatched

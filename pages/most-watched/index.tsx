'use client'

import React, { useState, useEffect, useCallback } from 'react'
import MovieList from '../../app/components/MovieList'
import InfiniteScrollObserver from '../../app/components/InfiniteScrollObserver'
import MovieFilters from '../../app/components/MovieFilters'
import { Movie } from '../../app/types/Movie'
import { useDebounce } from '../../app/helpers'
import {
  mostWatchedMoviesFilter,
  MostWatchedMoviesParams,
} from '../../app/components/api/mostWatchedMovies'
import { MoviesListResponse } from '../../app/types/Response'

type MoviesFetcherProps = {
  initialPage?: number
}

export default function MoviesFetcher({ initialPage = 1 }: MoviesFetcherProps) {
  const [page, setPage] = useState(initialPage)
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
      const data = (await mostWatchedMoviesFilter({
        filters: debouncedFilters,
        page,
      } as MostWatchedMoviesParams)) as MoviesListResponse
      if (page === 1) {
        setMovies(data.results)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results])
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
    <div className="flex flex-col items-center justify-center self-start py-2 mt-20">
      <MovieFilters onFiltersChange={handleFiltersChange} />

      <MovieList movies={movies} />
      {page < totalPages && (
        <InfiniteScrollObserver onIntersect={loadMoreMovies} />
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

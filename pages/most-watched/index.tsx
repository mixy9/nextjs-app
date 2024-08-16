'use client'

import React, { useState, useEffect, useCallback, memo, FC } from 'react'
import InfiniteScrollObserver from '../../app/components/InfiniteScrollObserver'
import MovieFilters from '../../app/components/MovieFilters'
import { Movie } from '../../app/types/movie'
import { useDebounce } from '../../app/useDebounce'
import {
  Filters,
  getMostWatchedMovies,
  MostWatchedMoviesParams,
} from '../../app/api/mostWatchedMoviesApi'
import { MoviesList } from '../../app/types/movie'
import MovieCard from '../../app/components/movie/MovieCard'

const MostWatched: FC = memo(() => {
  const [page, setPage] = useState<MoviesList['page']>(1)
  const [filters, setFilters] = useState<Filters | {}>({})
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
        setMovies(data.results)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results])
      }
      setTotalPages(data.total_pages)
      setLoading(false)
    }

    fetchMovies()
  }, [debouncedFilters, page])

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [debouncedFilters])

  const loadMoreMovies = () => {
    if (loading || page >= totalPages) return
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="flex flex-col py-2 mt-20 w-full h-full">
      <h1 className="text-4xl font-bold max-w-[55%] lg:text-5xl mb-8">
        Most Watched Movies
      </h1>
      <MovieFilters onFiltersChange={handleFiltersChange} />

      <div className="mt-6 flex flex-wrap w-full h-full justify-center md:justify-around gap-8">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center">No movies available.</p>
        )}
      </div>

      {page < totalPages && (
        <InfiniteScrollObserver onIntersect={loadMoreMovies} />
      )}

      {loading && <p>Loading...</p>}
    </div>
  )
})

MostWatched.displayName = 'MostWatched'

export default MostWatched

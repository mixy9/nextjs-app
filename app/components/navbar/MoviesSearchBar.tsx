'use client'

import {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  FC,
} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { searchMoviesApi } from '../../api/searchMoviesApi'
import UiButton from '../ui/UiButton'
import { Movie } from '../../types/movie'
import { useDebounce } from '../../useDebounce'

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const res = await searchMoviesApi(query)
  if (!res) {
    throw new Error('Failed to fetch')
  }
  return res
}

const MoviesSearchBar: FC = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 300)

  const sanitizedQuery: string = encodeURIComponent(
    debouncedQuery.replace(/[^a-zA-Z0-9 ]/g, '').trim()
  )

  const { data, error } = useSWR<Movie[], Error>(
    debouncedQuery ? sanitizedQuery : null,
    () => fetchMovies(sanitizedQuery),
    { revalidateOnFocus: false }
  )

  const movies = (data || []) as Movie[]

  useEffect(() => {
    setSelectedIndex(-1)
  }, [debouncedQuery])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < movies.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      )
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && movies[selectedIndex]) {
        router.push(`/movie-details/${movies[selectedIndex].id}`)
      } else {
        router.push(`/search?query=${query}`)
      }
    }
  }

  const handleMovieClick = (id: number) => {
    router.push(`/movie-details/${id}`)
  }

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      className="relative w-full md:w-80"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
          focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Die Hard"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          required
        />

        <div className="absolute end-2.5 bottom-2.5">
          <UiButton type="submit" size="sm">
            Search
          </UiButton>
        </div>
      </div>

      {debouncedQuery && movies.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-md shadow-lg z-50">
          <ul className="py-1" role="listbox">
            {movies.map((movie, index) => (
              <li
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer ${
                  index === selectedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">Failed to load movies</p>}
    </form>
  )
}

export default MoviesSearchBar

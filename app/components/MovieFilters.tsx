'use client'

import { useState, useEffect, FC, ChangeEvent } from 'react'
import UiSlider from './ui/UiSlider'
import { Genre } from '../types/movie'
import UiDropdown from './ui/UiDropdown'
import { getGenres } from '../api/discoverMoviesApi'
import { Filters } from '../api/mostWatchedMoviesApi'

type MovieFiltersProps = {
  onFiltersChange: (filters: Filters) => void
}

const releaseYears = {
  min: 1970,
  max: 2024,
} as const

const ratings = {
  min: 1,
  max: 10,
} as const

const MovieFilters: FC<MovieFiltersProps> = ({ onFiltersChange }) => {
  const [releaseYear, setReleaseYear] =
    useState<Filters['releaseYear']>(undefined)
  const [rating, setRating] = useState<Filters['rating']>(undefined)
  const [genres, setGenres] = useState<Filters['genres']>(undefined)

  const [initGenres, setInitGenres] = useState<Genre[]>([])

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const data = (await getGenres()) as Genre[]
        setInitGenres(data)
      } catch (err) {
        console.error('Error fetching genres', err)
      }
    }

    fetchGenresList()
  }, [])

  useEffect(() => {
    onFiltersChange({ releaseYear, rating, genres })
  }, [releaseYear, rating, genres, onFiltersChange])

  const handleReleaseYearChange = (value: number) => {
    setReleaseYear(value)
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleGenresChange = (e: ChangeEvent<HTMLInputElement>) => {
    const genreId = Number(e.target.value)

    let updatedGenres = genres ? genres.split(',').filter(Boolean) : []

    if (e.target.checked) {
      updatedGenres.push(String(genreId))
    } else {
      updatedGenres = updatedGenres.filter((id) => parseInt(id) !== genreId)
    }

    setGenres(updatedGenres.join(','))
  }

  return (
    <div className="flex gap-10 flex-wrap items-center justify-center lg:self-start py-2 mt-2">
      <div className="flex gap-3">
        Release year:
        <UiSlider
          min={releaseYears.min}
          max={releaseYears.max}
          step={1}
          onValueChange={handleReleaseYearChange}
        />
      </div>
      <div className="flex gap-3">
        Rating:
        <UiSlider
          min={ratings.min}
          max={ratings.max}
          step={0.5}
          onValueChange={handleRatingChange}
        />
      </div>

      <UiDropdown label="Genres" position="left">
        <ul role="none">
          {initGenres &&
            initGenres.map((genre: Genre) => (
              <li
                className="text-gray-700 block py-1 text-sm hover:bg-gray-100"
                key={genre.id}
              >
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${genre.id}`}
                    type="checkbox"
                    value={genre.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700
                    dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleGenresChange}
                    checked={genres?.includes(String(genre.id)) ?? false}
                  />
                  <label
                    htmlFor={`checkbox-item-${genre.id}`}
                    className="ms-2 text-sm font-medium"
                  >
                    {genre.name}
                  </label>
                </div>
              </li>
            ))}
        </ul>
      </UiDropdown>
    </div>
  )
}

export default MovieFilters

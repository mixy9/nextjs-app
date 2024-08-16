'use client'

import React, { useState, useEffect, FC } from 'react'
import Slider from '../../app/components/Slider'
import GenresFilterDropdown from '../../app/components/GenresFilterDropdown'

type MovieFiltersProps = {
  onFiltersChange: (filters: {
    releaseYear?: number
    rating?: number
    genres?: string
  }) => void
}

const MovieFilters: FC<MovieFiltersProps> = ({ onFiltersChange }) => {
  const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined)
  const [rating, setRating] = useState<number | undefined>(undefined)
  const [genres, setGenres] = useState<string | undefined>(undefined)

  useEffect(() => {
    onFiltersChange({ releaseYear, rating, genres })
  }, [releaseYear, rating, genres, onFiltersChange])

  const handleReleaseYearChange = (value: number) => {
    setReleaseYear(value)
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleGenresChange = (selectedGenres: number[]) => {
    setGenres(selectedGenres.join(','))
  }

  return (
    <div className="flex gap-10 flex-wrap items-center justify-center lg:self-start py-2 mt-2">
      <div className="flex gap-3">
        Release year:
        <Slider
          min={1970}
          max={2024}
          step={1}
          onValueChange={handleReleaseYearChange}
        />
      </div>
      <div className="flex gap-3">
        Rating:
        <Slider
          min={1}
          max={10}
          step={0.5}
          onValueChange={handleRatingChange}
        />
      </div>
      <GenresFilterDropdown onChange={handleGenresChange} />
    </div>
  )
}

export default MovieFilters

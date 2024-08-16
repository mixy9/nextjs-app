'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { FavoriteMovie, Movie } from '../../types/movie'

type UiHeartIconProps = {
  movie: Movie
  size: number
}

const FavoriteMovieBtn: FC<UiHeartIconProps> = ({
  movie,
  size,
}: UiHeartIconProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')

    if (storedFavorites) {
      const favoritesArr: FavoriteMovie[] = JSON.parse(storedFavorites)
      const isFavorite = favoritesArr.some(
        (favorite) => favorite.id === movie.id
      )

      setIsActive(isFavorite)
    }
  }, [movie.id])

  const handleFavoriteToggle = useCallback(() => {
    const storedFavorites = localStorage.getItem('favorites')
    let favoritesArray: { id: number; title: string }[] = []

    if (storedFavorites) {
      favoritesArray = JSON.parse(storedFavorites)
    }

    if (isActive) {
      // Remove from favorites
      const updatedFavorites = favoritesArray.filter(
        (fav) => fav.id !== movie.id
      )

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    } else {
      favoritesArray.push({ id: movie.id, title: movie.title })

      localStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    setIsActive(!isActive)
  }, [isActive, movie.id, movie.title])

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleFavoriteToggle()
      }}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${
          isActive ? 'fill-red-500' : 'opacity-25'
        } hover:fill-red-500 hover:opacity-100`}
        height={size}
        width={size}
      >
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25c0-2.928 2.464-5.25 5.438-5.25A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>
    </button>
  )
}

export default FavoriteMovieBtn

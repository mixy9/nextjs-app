'use client'

import { useState, useEffect, FC } from 'react'
import Link from 'next/link'
import { FavoriteMovie, Movie } from '../../types/movie'
import UiDropdown from '../ui/UiDropdown'

const FavoritesDropdown: FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    const storedFavorites: Pick<Movie, 'id' | 'title'>[] =
      JSON.parse(localStorage.getItem('favorites') as string) || []

    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites)
    }
  }, [])

  return (
    <UiDropdown label="Favorites">
      <ul role="none">
        {favorites.length ? (
          favorites.map((favorite: FavoriteMovie) => (
            <li key={favorite.id}>
              <Link
                className="text-gray-700 block text-sm p-2 hover:bg-gray-100"
                href={{
                  pathname: '/movie-details/[id]',
                  query: { id: favorite.id },
                }}
              >
                {favorite.title}
              </Link>
            </li>
          ))
        ) : (
          <li
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            id="menu-item-0"
          >
            No favorites
          </li>
        )}
      </ul>
    </UiDropdown>
  )
}

export default FavoritesDropdown

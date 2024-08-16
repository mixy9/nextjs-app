'use client'

import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import Link from 'next/link'
import UiButton from './ui/UiButton'
import { FavoriteMovie, Movie } from '../types/Movie'
import Image from 'next/image'

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev)

    const storedFavorites: Pick<Movie, 'id' | 'title'>[] =
      JSON.parse(localStorage.getItem('favorites') as string) || []

    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <UiButton
        name="Favorites"
        icon={
          <Image
            src="images/chevron-down.svg"
            alt="ChevronDown"
            width={20}
            height={20}
          />
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
        clickEvent={handleToggleDropdown}
      />

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <ul className="py-1" role="none">
            {favorites.length ? (
              favorites.map((favorite: FavoriteMovie) => (
                <li key={favorite.id}>
                  <Link
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
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
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                id="menu-item-0"
              >
                No favorites
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

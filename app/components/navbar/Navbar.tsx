import Image from 'next/image'
import MoviesSearchBar from './MoviesSearchBar'
import FavoritesDropdown from './FavoritesDropdown'
import React, { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="navbar">
      <div className="lg:hidden">
        <Image
          className="cursor-pointer"
          src="images/menu-mobile.svg"
          alt="MenuMobile"
          width={30}
          height={30}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      <nav className="hidden items-center justify-between gap-4 lg:flex">
        <MoviesSearchBar />
        <FavoritesDropdown />
      </nav>

      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-cyan-950 flex flex-wrap items-center justify-between gap-4 py-4 px-6 lg:hidden">
          <MoviesSearchBar />
          <FavoritesDropdown />
        </nav>
      )}
    </div>
  )
}

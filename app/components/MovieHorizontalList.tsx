'use client'

import React, { useRef, useState } from 'react'
import MovieItem from './MovieItem'
import styles from '../styles/scroller.module.css'
import { Movie } from '../types/Movie'

type MovieHorizontalList = {
  movies: Movie[]
}

export default function MovieHorizontalList({ movies }: MovieHorizontalList) {
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [isHovered, setIsHovered] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = (scrollAmount: number) => {
    const newScrollPosition = scrollPosition + scrollAmount

    setScrollPosition(newScrollPosition)

    if (containerRef.current && 'scrollLeft' in containerRef.current) {
      containerRef.current.scrollLeft = newScrollPosition
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="flex relative justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <button
          className={`absolute ${styles.actionButton} left-0 z-10`}
          onClick={() => handleScroll(-200)}
        >
          <div
            className={`${styles.chevronCircle} ${styles.chevronCircleLeft}`}
          ></div>
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          overflowX: 'scroll',
          scrollBehavior: 'smooth',
        }}
      >
        <div className="flex w-full gap-5">
          {movies.map((movie) => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
        </div>
      </div>

      {isHovered && (
        <button
          className={`absolute ${styles.actionButton} right-0 z-10`}
          onClick={() => handleScroll(200)}
        >
          <div
            className={`${styles.chevronCircle} ${styles.chevronCircleRight}`}
          ></div>
        </button>
      )}
    </div>
  )
}

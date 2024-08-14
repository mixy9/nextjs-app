import React, { useRef, useState } from "react";
import MovieItem from './MovieItem';
import styles from '../styles/home.module.css'

export default function MovieHorizontalList({movies}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef();

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);

    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <div className="flex relative justify-center">
      <button className={`absolute ${styles.actionButton} left-0 z-10`} onClick={() => handleScroll(-200)}>Scroll Left</button>

      <div
        ref={containerRef}
        style={{
          overflowX: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        <div className="flex w-full gap-5">
          {movies.map((movie) => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
        </div>
      </div>

      <button className={`absolute ${styles.actionButton} right-0 z-10`} onClick={() => handleScroll(200)}>Scroll Right</button>
    </div>
  );
}

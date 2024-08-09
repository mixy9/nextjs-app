import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import MovieItem from './MovieItem';

export default function MovieHorizontalList({ movies }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-5">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {movies.map((movie) => (
          <MovieItem movie={movie} key={movie} />
        ))}
      </ScrollMenu>
    </div>
  );
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className="left"
    >
      Left
    </Arrow>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className="right"
    >
      Right
    </Arrow>
  );
};

const Arrow = ({ children, disabled, onClick, className }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={className}
    style={{
      opacity: disabled ? 0.3 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      margin: '0 5px',
    }}
  >
    {children}
  </button>
);

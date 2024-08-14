'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeartIcon from './icons/HeartIcon';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';

type MovieCardProps = {
  movie: Movie;
}

export default function MovieItem({ movie }: MovieCardProps) {
  const fallbackImageUrl = '/logo.png';
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallbackImageUrl;

  const truncatedTitle =
    movie.title.length > 25
      ? movie.title.substring(0, 25) + '...'
      : movie.title;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the current movie is in the stored favorites
    const isFavorite = storedFavorites.some((fav: { id: number }) => fav.id === movie.id);
    setIsActive(isFavorite);
  }, [movie.id]);

  const handleFavoriteToggle = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (Array.isArray(storedFavorites)) {
      if (isActive) {
        const newFavorites = storedFavorites.filter((fav: { id: number }) => fav.id !== movie.id);

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsActive(false);
      } else {
        storedFavorites.push({ id: movie.id, title: movie.title });
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        setIsActive(true);
      }
    }
  };

  return (
    <Link href={{
      pathname: `/movie/[id]`,
      query: { id: movie.id },
    }}>
      <div className={`relative w-64 h-96 flex justify-center items-center overflow-hidden ${
        !movie.poster_path ? 'p-10' : ''
      }`}>
        <Image
          src={imageUrl}
          alt={truncatedTitle}
          layout="responsive"
          width={256}
          height={384}
          objectFit="cover"
          className="rounded-md"
        />
        <HeartIcon onClick={(e) => { e.preventDefault(); handleFavoriteToggle(); }} active={isActive} />
      </div>
      <h3 className="text-white text-lg">{truncatedTitle}</h3>
    </Link>
  );
}

import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/api/discoverMovies';

export default function GenresFilterDropdown ({ onValueChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error('Error fetching genres', err);
      }
    };

    fetchGenresList();
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (event) => {
    const genreId = Number(event.target.value);
    let updatedGenres;

    if (event.target.checked) {
      updatedGenres = [...selectedGenres, genreId];
    } else {
      updatedGenres = selectedGenres.filter((id) => id !== genreId);
    }

    setSelectedGenres(updatedGenres);
    onValueChange(updatedGenres);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-cyan-300 shadow-sm px-4 py-2 bg-cyan-100 text-sm font-medium text-gray-700 hover:bg-cyan-50 focus:outline-none"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleToggleDropdown}
      >
        Genres
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.83l3.71-3.6a.75.75 0 111.04 1.08l-4 3.88a.75.75 0 01-1.04 0l-4-3.88a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <ul className="py-1" role="none">
            {genres.map((genre) => (
              <li key={genre.id}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${genre.id}`}
                    type="checkbox"
                    value={genre.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    onChange={handleChange}
                    checked={selectedGenres.includes(genre.id)}
                  />
                  <label
                    htmlFor={`checkbox-item-${genre.id}`}
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    {genre.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

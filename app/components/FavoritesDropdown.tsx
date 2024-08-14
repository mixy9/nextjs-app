import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Dropdown () {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (Array.isArray(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-cyan-300 shadow-sm px-4 py-2 bg-cyan-100 text-sm font-medium text-gray-700 hover:bg-cyan-50 focus:outline-none"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleToggleDropdown}
      >
        Favorites
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
            {favorites.length ? (
              favorites.map((favorite) => (
                <li
                  key={favorite.id}>
                  <Link
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    href={{
                      pathname: '/movie/[id]',
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
  );
};

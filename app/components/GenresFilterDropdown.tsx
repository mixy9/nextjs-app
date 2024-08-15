import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react'
import { getGenres } from './api/discoverMovies'
import UiButton from './ui/UiButton'
import { Genre } from '../types/Movie'
import Image from 'next/image'

type GenresFilterDropdown = {
  onChange: (selectedGenres: number[]) => void
}

export default function GenresFilterDropdown({
  onChange,
}: GenresFilterDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<Genre['id'][]>([])

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        const data = (await getGenres()) as Genre[]
        setGenres(data)
      } catch (err) {
        console.error('Error fetching genres', err)
      }
    }

    fetchGenresList()
  }, [])

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const genreId = Number(e.target.value)
    let updatedGenres

    if (e.target.checked) {
      updatedGenres = [...selectedGenres, genreId]
    } else {
      updatedGenres = selectedGenres.filter((id) => id !== genreId)
    }

    setSelectedGenres(updatedGenres)
    onChange(updatedGenres)
  }

  return (
    <div className="relative inline-block text-left">
      <UiButton
        name="Genres"
        icon={
          <Image
            src="images/chevron_down.svg"
            alt="ChevronDown"
            width={12}
            height={12}
          />
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
        clickEvent={handleToggleDropdown}
      />

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 mt-2 w-56 p-3 rounded-md shadow-lg ring-1 bg-gray-700 z-10 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <ul role="none">
            {genres.map((genre: Genre) => (
              <li className="py-1" key={genre.id}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${genre.id}`}
                    type="checkbox"
                    value={genre.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700
                    dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleChange}
                    checked={selectedGenres.includes(genre.id)}
                  />
                  <label
                    htmlFor={`checkbox-item-${genre.id}`}
                    className="ms-2 text-sm font-medium text-white"
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
  )
}

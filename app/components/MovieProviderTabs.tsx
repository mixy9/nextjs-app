'use client'

import { FC, memo, useState } from 'react'
import MovieCard from './movie/MovieCard'
import { Movie } from '../types/movie'

type ProviderTabsProps = {
  moviesByProvider: Record<string, Movie[]>
}

const MovieProviderTabs: FC<ProviderTabsProps> = memo(
  ({ moviesByProvider }) => {
    const [activeTab, setActiveTab] = useState(
      Object.keys(moviesByProvider)[0] || ''
    )

    if (!moviesByProvider || Object.keys(moviesByProvider).length === 0) {
      return <p>No providers available.</p>
    }

    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-10">
        <div className="block w-full rounded-lg text-center text-surface shadow-secondary-1 text-white">
          <div className="border-b-2 border-neutral-100 p-3 dark:border-white/10">
            <ul
              className="flex list-none flex-col flex-wrap ps-0 md:flex-row gap-2"
              role="tablist"
            >
              {Object.keys(moviesByProvider).map((providerName) => (
                <li role="presentation" key={providerName}>
                  <a
                    className={`cursor-pointer block rounded bg-grey-200 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${
                      activeTab === providerName
                        ? 'bg-primary-100 dark:bg-gray-950'
                        : 'dark:bg-gray-600'
                    } md:me-4`}
                    onClick={() => setActiveTab(providerName)}
                  >
                    {providerName}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            {moviesByProvider[activeTab] &&
            moviesByProvider[activeTab].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moviesByProvider[activeTab].map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            ) : (
              <p>No movies available for this provider.</p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

MovieProviderTabs.displayName = 'MovieProviderTabs'

export default MovieProviderTabs

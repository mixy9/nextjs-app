import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FC, ReactNode } from 'react'
import FavoritesDropdown from './FavoritesDropdown'
import MoviesSearchBar from './MoviesSearchBar'

import '../styles/global.css'

const siteTitle = 'BestMovies.com'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode
  home?: boolean
}

const Layout: FC<LayoutProps> = ({ children, home }: LayoutProps) => {
  return (
    <div
      className={`bg-gray-900 min-h-screen ${inter.className} text-white grid grid-cols-1`}
    >
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="flex justify-between items-center h-24 py-3 gap-8 px-8 bg-cyan-950 top-0 sticky z-10">
        <div className="flex items-center gap-3">
          {home ? (
            <>
              <Image
                priority
                src="/logo.png"
                height={60}
                width={60}
                alt={`${siteTitle} logo`}
              />
              <h1 className="text-2xl font-bold">{siteTitle}</h1>
            </>
          ) : (
            <Link
              className="flex gap-3 items-center"
              href="/"
              aria-label="Go to home page"
            >
              <Image
                priority
                src="/logo.png"
                height={45}
                width={45}
                alt={`${siteTitle} logo`}
              />
              <h2 className="text-2xl font-medium">{siteTitle}</h2>
            </Link>
          )}
        </div>

        <nav className="flex items-center justify-between gap-4">
          <MoviesSearchBar />
          <FavoritesDropdown />
        </nav>
      </header>

      <main className="flex flex-col justify-center items-center overflow-hidden w-full h-full">
        {children}
      </main>
    </div>
  )
}

export default Layout

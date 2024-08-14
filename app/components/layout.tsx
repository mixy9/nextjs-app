
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/global.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Dropdown from './FavoritesDropdown';
import SearchMovies from './SearchMovies';

const appName = 'BestMovies.com';
export const siteTitle = 'BestMovies.com';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
}

// http://localhost:3000/_next/image?url=%2Flogo.png&w=1920&q=75

export default function Layout({ children, home }: LayoutProps) {
  return (
      <div className={`bg-cyan-950 min-h-screen ${inter.className} text-white grid gap-10 grid-cols-1`}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="Learn how to build a personal website using Next.js" />
            <meta
              property="og:image"
              content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <title>{siteTitle}</title>
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          <header className="flex justify-between items-center py-3 gap-8 px-8 bg-cyan-700 top-0 sticky z-10">
            <div className="flex items-center gap-3">
              {home ? (
                <>
                  <Image priority src="/logo.png" height={60} width={60} alt={`${appName} logo`} />
                  <h1 className="text-2xl font-bold">{appName}</h1>
                </>
              ) : (
                <>
                  <Link href="/" aria-label="Go to home page">
                    <Image priority src="/logo.png" height={50} width={50} alt={`${appName} logo`} />
                  </Link>
                  <h2 className="text-2xl font-bold">
                    <Link href="/">{appName}</Link>
                  </h2>
                </>
              )}
            </div>

            <nav>
              <Dropdown />
            </nav>

            <SearchMovies />
          </header>

          <main className="flex flex-col justify-center items-center px-8 overflow-hidden">
            {children}
          </main>
      </div>
  );
}

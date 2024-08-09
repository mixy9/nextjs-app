import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import Link from 'next/link';
import '../styles/global.css';
import { Inter } from 'next/font/google';

const appName = 'BestMovies.com';
export const siteTitle = 'BestMovies.com';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children, home }) {
  return (
    <div
      className={`bg-cyan-950 min-h-screen ${inter.className} px-8 grid gap-10 grid-cols-1`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffron
                    t%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex justify-between items-center py-3">
        {home ? (
          <div className="flex items-center justify-center mx-auto gap-3">
            <Image priority src="/logo.png" height={60} width={60} alt="" />
            <span className="text-2xl font-bold mx-auto">{appName}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3">
              <Link href="/">
                <Image priority src="/logo.png" height={50} width={50} alt="" />
              </Link>
              <span className="text-2xl font-bold mx-auto">
                <Link href="/">{appName}</Link>
              </span>
            </div>
          </>
        )}
        <div>Search</div>
      </header>
      <main className="flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}

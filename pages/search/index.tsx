import { useRouter } from 'next/router';
import useSWR from 'swr';
import { searchMovies } from '../../app/services/api/search';

export default function SearchDetails() {
  const router = useRouter();
  const { q } = router.query; // Get query from the URL

  // Custom fetcher function that calls your API service
  const fetcher = (query) => searchMovies(query);

  // Only run the SWR fetch if `q` exists
  const { data, error } = useSWR(q ? [q] : null, fetcher, { revalidateOnFocus: false });

  // Handle loading state
  if (!data && !error) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Failed to load data</div>;

  const movies = data || [];

  console.log(q, 'llalala');

  return (
    <div>
      <h1>Search Results for</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

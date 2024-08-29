import { fetchMovies } from './server/api';
import HomeWrapper from './components/HomeWrapper';

export default async function Page() {
  let initialMovies = [];
  let initialError: string | null = null;

  try {
    initialMovies = await fetchMovies();
  } catch (error) {
    if (error instanceof Error) {
      initialError = error.message;
    } else {
      initialError = 'An unknown error occurred';
    }
  }

  return <HomeWrapper initialMovies={initialMovies} initialError={initialError} />;
}
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '700face7162d1d9c5a6b7fa549cf750a';

export async function fetchMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

    if (!response.ok) {
      throw new Error('Failed to fetch movies. Please try again later.');
    }

    const data = await response.json();

    return data.results.slice(0, 3).map((movie: any) => ({
      id: movie.id.toString(),
      imageSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      altText: movie.title,
      count: 0,
      liked: false,
    }));
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw new Error('Failed to fetch movies.');
  }
}
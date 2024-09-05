import { fetchMovies } from '../../server/api';

global.fetch = jest.fn();

describe('fetchMovies', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches movies successfully', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg' },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    const movies = await fetchMovies();

    expect(movies).toEqual([
      {
        id: '1',
        imageSrc: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
        altText: 'Movie 1',
        count: 0,
        liked: false,
      },
      {
        id: '2',
        imageSrc: 'https://image.tmdb.org/t/p/w500/poster2.jpg',
        altText: 'Movie 2',
        count: 0,
        liked: false,
      },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular?api_key=700face7162d1d9c5a6b7fa549cf750a&language=en-US&page=1'
    );
  });

  it('handles fetch failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    await expect(fetchMovies()).rejects.toThrow('Failed to fetch movies.');
  });
});

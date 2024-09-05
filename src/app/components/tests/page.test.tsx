import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Page from '../../page'; 
import '@testing-library/jest-dom'; 


jest.mock('../../server/api', () => ({
  fetchPopularMovies: jest.fn(() => Promise.resolve({
    results: [
      { id: 1, title: 'Movie 1', imageSrc: 'image1.jpg', altText: 'Movie 1', count: 10, liked: false },
      { id: 2, title: 'Movie 2', imageSrc: 'image2.jpg', altText: 'Movie 2', count: 20, liked: true }
    ]
  })),
}));

describe('Page Component', () => {
  test('renders the page with movies data', async () => {
   
    render(<Page />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();

      expect(screen.getByAltText('Movie 1')).toHaveAttribute('src', 'image1.jpg');
      expect(screen.getByAltText('Movie 2')).toHaveAttribute('src', 'image2.jpg');
    });
  });

  test('renders error message when data fetching fails', async () => {
    jest.mock('../../server/api', () => ({
      fetchPopularMovies: jest.fn(() => Promise.reject(new Error('Failed to fetch data'))),
    }));

    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch data/i)).toBeInTheDocument();
    });
  });
});

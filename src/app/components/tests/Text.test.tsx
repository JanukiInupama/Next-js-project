import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from '../Text';

test('renders Text component with content', () => {
  const content = 'This is a sample text content.';
  
  const { getByText } = render(<Text content={content} />);
  
  const contentElement = getByText(content);
  expect(contentElement).toBeInTheDocument();
  expect(contentElement).toHaveClass('text-base');
  expect(contentElement).toHaveClass('text-gray-800');
});

test('renders Text component with mobileNote', () => {
  const content = 'This is a sample text content.';
  const mobileNote = 'This note is visible on mobile devices.';
  
  const { getByText } = render(<Text content={content} mobileNote={mobileNote} />);
  
  const mobileNoteElement = getByText(mobileNote);
  expect(mobileNoteElement).toBeInTheDocument();
  expect(mobileNoteElement).toHaveClass('text-gray-600');
  expect(mobileNoteElement).toHaveClass('md:hidden');
});

test('does not render mobileNote if not provided', () => {
  const content = 'This is a sample text content.';
  
  const { queryByText } = render(<Text content={content} />);
  
  const mobileNoteElement = queryByText('This note is visible on mobile devices.');
  expect(mobileNoteElement).not.toBeInTheDocument();
});

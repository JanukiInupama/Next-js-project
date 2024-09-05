import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal';

test('renders Modal when isOpen is true', () => {
  const onClose = jest.fn();

  const { getByRole, getByText } = render(
    <Modal isOpen={true} onClose={onClose}>
      <p>Modal Content</p>
    </Modal>
  );

  expect(getByRole('dialog')).toBeInTheDocument();

  expect(getByText('Modal Content')).toBeInTheDocument();
});

test('does not render Modal when isOpen is false', () => {
  const onClose = jest.fn();

  const { queryByRole } = render(
    <Modal isOpen={false} onClose={onClose}>
      <p>Modal Content</p>
    </Modal>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();

  const { getByLabelText } = render(
    <Modal isOpen={true} onClose={onClose}>
      <p>Modal Content</p>
    </Modal>
  );

  const closeButton = getByLabelText('Close modal');
  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
});

test('calls onClose when Escape key is pressed', () => {
  const onClose = jest.fn();

  render(
    <Modal isOpen={true} onClose={onClose}>
      <p>Modal Content</p>
    </Modal>
  );

  fireEvent.keyDown(window, { key: 'Escape' });

  expect(onClose).toHaveBeenCalled();
});

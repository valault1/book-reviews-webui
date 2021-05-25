import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookReviewsEditor from './BookReviewsEditor';

describe('<BookReviewsEditor />', () => {
  test('it should mount', () => {
    render(<BookReviewsEditor />);
    
    const bookReviewsEditor = screen.getByTestId('BookReviewsEditor');

    expect(bookReviewsEditor).toBeInTheDocument();
  });
});
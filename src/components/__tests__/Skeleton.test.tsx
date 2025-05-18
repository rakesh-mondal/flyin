import React from 'react';
import { render, screen } from '../../testing/test-utils';
import { Skeleton } from '../ui/skeleton';

describe('Skeleton Component', () => {
  it('renders with default properties', () => {
    render(<Skeleton />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders with correct dimensions when specified', () => {
    render(<Skeleton className="w-10 h-10" />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toHaveClass('w-10');
    expect(skeleton).toHaveClass('h-10');
  });
}); 
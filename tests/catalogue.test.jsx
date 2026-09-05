import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/somstar-catalogue/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Catalogue case study', () => {
  it('opens and closes with the live client link', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /somstarkitchen\.com/i });
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.forEach((l) => expect(l).toHaveAttribute('href', 'https://somstarkitchen.com'));
  });

  it('carries the verified figures', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toContain('63');
    expect(container.textContent).toContain('219');
  });

  it('renders three figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(3);
  });

  it('never links the private repository', () => {
    const { container } = render(<Page />);
    expect(container.innerHTML).not.toContain('github.com/saturnthehustler/somstar-website');
  });
});

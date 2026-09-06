import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from '@/app/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Home', () => {
  it('states the argument in the first heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 }).textContent)
      .toMatch(/Monday morning/i);
  });

  it('links the live client site prominently for prospective clients', () => {
    render(<Home />);
    const links = screen.getAllByRole('link', { name: /somstarkitchen\.com/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://somstarkitchen.com');
  });

  it('lists all three work entries', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /business system/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /catalogue/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /earlier/i })).toBeInTheDocument();
  });

  it('leads with the offer, before the evidence', () => {
    const { container } = render(<Home />);
    const lead = container.querySelector('.lead-in');
    const work = container.querySelector('.work');
    expect(lead).toBeInTheDocument();
    // Node.compareDocumentPosition: 4 means `work` follows `lead`.
    expect(lead.compareDocumentPosition(work) & 4).toBeTruthy();
    expect(screen.getByRole('link', { name: /what i can build you/i }))
      .toHaveAttribute('href', '/build/');
  });

  it('mentions no employer anywhere', () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/Macruuf|Taaj/i);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/earlier/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Earlier work', () => {
  it('lists all five projects', () => {
    render(<Page />);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);
  });

  it('links each public repository', () => {
    render(<Page />);
    const links = screen.getAllByRole('link', { name: /on github/i });
    expect(links).toHaveLength(5);
    links.forEach((l) => expect(l.getAttribute('href')).toContain('github.com/saturnthehustler/'));
  });

  it('frames the work honestly rather than inflating it', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/learned to finish/i);
  });
});

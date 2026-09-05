import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/somstar-system/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Business system case study', () => {
  it('renders five figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(5);
  });

  it('marks the shareholding example as invented rather than a real arrangement', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/invented, not any client/i);
  });

  it('names the admin host in prose but never links it', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toContain('inventory.somstarkitchen.com');
    expect(container.querySelector('a[href*="inventory.somstarkitchen.com"]')).toBeNull();
  });

  // Asserting the absence of a specific figure here would mean writing that
  // figure into a public repository, which is the thing being prevented.
  // scripts/check-privacy.mjs owns that list; it exempts only itself.
  it('describes the year close without its commercial terms', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/commercial terms .*theirs rather than mine/i);
  });

  it('presents the role matrix as a table', () => {
    render(<Page />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('says plainly why there are no screenshots', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/missing on purpose/i);
  });
});

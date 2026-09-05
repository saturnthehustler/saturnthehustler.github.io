import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/work/somstar-system/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Business system case study', () => {
  it('renders four figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(4);
  });

  it('names the admin host in prose but never links it', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toContain('inventory.somstarkitchen.com');
    expect(container.querySelector('a[href*="inventory.somstarkitchen.com"]')).toBeNull();
  });

  it('publishes no real client figures', () => {
    const { container } = render(<Page />);
    expect(container.textContent).not.toContain('61,641');
    expect(container.textContent).not.toContain('61641');
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

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/build/features/page';
import { INCLUDED, NOT_INCLUDED } from '@/lib/features';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('features data', () => {
  it('every included feature explains what it does, not just its name', () => {
    const items = INCLUDED.flatMap((g) => g.items);
    expect(items.length).toBeGreaterThan(20);
    items.forEach((i) => {
      expect(i.name.length).toBeGreaterThan(2);
      expect(i.what.length).toBeGreaterThan(40);
    });
  });

  it('every omitted feature says when a client would actually need it', () => {
    expect(NOT_INCLUDED.length).toBeGreaterThan(8);
    NOT_INCLUDED.forEach((i) => {
      expect(i.what.length).toBeGreaterThan(20);
      expect(i.when.length).toBeGreaterThan(20);
    });
  });
});

describe('Features page', () => {
  it('renders every included feature', () => {
    const { container } = render(<Page />);
    INCLUDED.flatMap((g) => g.items).forEach((i) => {
      expect(container.textContent).toContain(i.name);
    });
  });

  it('renders the omissions as a table rather than burying them', () => {
    render(<Page />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('is honest that the omissions are buildable, not impossible', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/can be built|none of.*impossible/i);
  });

  it('points back at the live site so claims can be checked', () => {
    render(<Page />);
    expect(screen.getAllByRole('link', { name: /somstarkitchen\.com/i }).length).toBeGreaterThan(0);
  });

  it('quotes no prices', () => {
    const { container } = render(<Page />);
    expect(container.textContent.match(/\$[1-9][\d,]*/g) || []).toEqual([]);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/build/system/page';
import { SYSTEM_INCLUDED as INCLUDED, SYSTEM_NOT_INCLUDED as NOT_INCLUDED } from '@/lib/system-features';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('system features data', () => {
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

describe('System features page', () => {
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

  it('explains why this one cannot simply be opened and checked', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/behind a login/i);
    expect(screen.getByRole('link', { name: /business system write-up/i })).toBeInTheDocument();
  });

  // Naming the forbidden phrases here to assert their absence would write
  // them into a public repository, which is the thing being prevented.
  // scripts/check-privacy.mjs owns that list and scans the built output.
  it('states plainly that the arrangement belongs to the business', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/belongs to the business, not to me/i);
    expect(container.textContent).toMatch(/never reveals|nothing here reveals/i);
  });

  it('quotes no prices', () => {
    const { container } = render(<Page />);
    expect(container.textContent.match(/\$[1-9][\d,]*/g) || []).toEqual([]);
  });
});

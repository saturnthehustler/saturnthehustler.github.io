import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/build/page';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('What I can build you', () => {
  it('offers both a website and a system', () => {
    render(<Page />);
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(headings.some((h) => /website/i.test(h))).toBe(true);
    expect(headings.some((h) => /system/i.test(h))).toBe(true);
  });

  it('carries three figures', () => {
    render(<Page />);
    expect(screen.getAllByRole('figure')).toHaveLength(3);
  });

  it('opens in the reader situation rather than a list of services', () => {
    const { container } = render(<Page />);
    // The page sets a typographic apostrophe, so match either form.
    expect(container.textContent).toMatch(/can[’']t find|cannot find/i);
    expect(container.textContent).toMatch(/paper, WhatsApp/i);
  });

  it('says plainly what is out of scope, so a reader can rule themselves out', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/what (this|it) is not|deliberately isn/i);
  });

  it('commits to keeping the thing running after launch', () => {
    const { container } = render(<Page />);
    expect(container.textContent).toMatch(/keep it running|keep them running|still ship/i);
  });

  it('quotes no prices — the page invites a conversation instead', () => {
    const { container } = render(<Page />);
    // A fee would read as "$1,200" or "from $500". Hosting costing nothing is
    // a fact about the build, not a price, so $0 is allowed.
    const priced = container.textContent.match(/\$[1-9][\d,]*/g) || [];
    expect(priced).toEqual([]);
  });

  it('sends every path to the same way of getting in touch', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: /open whatsapp/i })).toBeInTheDocument();
  });

  it('points at work the reader can check for themselves', () => {
    render(<Page />);
    expect(screen.getAllByRole('link', { name: /somstarkitchen\.com/i }).length).toBeGreaterThan(0);
  });
});

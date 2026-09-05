import { render, screen, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Reveal from '@/components/Reveal';

vi.mock('motion/react', () => ({
  useInView: () => false,
  useReducedMotion: () => globalThis.__reduced ?? false,
}));

describe('Reveal', () => {
  beforeEach(() => { vi.useFakeTimers(); globalThis.__reduced = false; });
  afterEach(() => { vi.useRealTimers(); });

  it('always renders its children, so content is never lost', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByText('Readable')).toBeInTheDocument();
  });

  it('starts hidden when out of view', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'false');
  });

  it('reveals after the five second failsafe even if never in view', () => {
    render(<Reveal><p>Readable</p></Reveal>);
    act(() => { vi.advanceTimersByTime(5000); });
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'true');
  });

  it('is revealed immediately when reduced motion is requested', () => {
    globalThis.__reduced = true;
    render(<Reveal><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal')).toHaveAttribute('data-in', 'true');
  });

  it('passes its stagger index through as a custom property', () => {
    render(<Reveal index={3}><p>Readable</p></Reveal>);
    expect(screen.getByTestId('reveal').style.getPropertyValue('--stagger-index')).toBe('3');
  });
});

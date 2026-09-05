import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Figure from '@/components/Figure';

vi.mock('motion/react', () => ({ useInView: () => true, useReducedMotion: () => false }));

describe('Figure', () => {
  it('renders the caption as a figcaption', () => {
    render(<Figure title="Pipeline" caption="How a photo becomes six files."><svg /></Figure>);
    expect(screen.getByText(/How a photo becomes six files\./).tagName).toBe('FIGCAPTION');
  });

  it('gives the figure an accessible name', () => {
    render(<Figure title="Pipeline" caption="c"><svg /></Figure>);
    expect(screen.getByRole('figure', { name: /Pipeline/i })).toBeInTheDocument();
  });

  it('puts wide content in its own scroll container', () => {
    const { container } = render(<Figure title="t" caption="c"><svg /></Figure>);
    expect(container.querySelector('.figure-scroll')).toBeInTheDocument();
  });
});

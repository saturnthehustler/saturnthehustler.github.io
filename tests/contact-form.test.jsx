import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactForm from '@/components/ContactForm';

describe('ContactForm', () => {
  it('renders a usable WhatsApp link before any input, for the no-JS case', () => {
    render(<ContactForm />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', 'https://wa.me/252619500776');
  });

  it('offers the email address as an alternative', () => {
    render(<ContactForm />);
    expect(screen.getByRole('link', { name: /Abdirahman\.bcs@gmail\.com/i }))
      .toHaveAttribute('href', 'mailto:Abdirahman.bcs@gmail.com');
  });

  it('updates the link href as the visitor types', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ayaan' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } });
    expect(screen.getByRole('link', { name: /whatsapp/i }).getAttribute('href'))
      .toContain('Ayaan');
  });

  it('never posts anywhere — there is no action and no submit button', () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector('form');
    expect(form).not.toHaveAttribute('action');
    expect(container.querySelector('button[type="submit"], input[type="submit"]')).toBeNull();
  });
});

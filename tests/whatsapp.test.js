import { describe, expect, it } from 'vitest';
import { composeWhatsAppUrl, WHATSAPP_DIGITS, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

describe('composeWhatsAppUrl', () => {
  it('targets the digits-only number with no plus or spaces', () => {
    expect(WHATSAPP_DIGITS).toBe('252619500776');
    expect(composeWhatsAppUrl({ name: 'A', need: 'hiring', message: 'Hi' }))
      .toContain('https://wa.me/252619500776?text=');
  });

  it('keeps a display form with the plus and spacing', () => {
    expect(WHATSAPP_DISPLAY).toBe('+252 61 950 0776');
  });

  it('percent-encodes newlines and spaces', () => {
    const url = composeWhatsAppUrl({ name: 'Ayaan', need: 'new-build', message: 'Two lines\nhere' });
    expect(url).not.toContain(' ');
    expect(url).toContain('%0A');
  });

  it('includes the name, a readable need label, and the message', () => {
    const url = composeWhatsAppUrl({ name: 'Ayaan', need: 'new-build', message: 'A shop system' });
    const text = decodeURIComponent(url.split('?text=')[1]);
    expect(text).toContain('Ayaan');
    expect(text).toContain('a new build');
    expect(text).toContain('A shop system');
  });

  it('falls back to a bare link when every field is empty', () => {
    expect(composeWhatsAppUrl({ name: '', need: '', message: '' }))
      .toBe('https://wa.me/252619500776');
  });
});

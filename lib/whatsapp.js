export const WHATSAPP_DIGITS = '252619500776';
export const WHATSAPP_DISPLAY = '+252 61 950 0776';
export const EMAIL = 'Abdirahman.bcs@gmail.com';

export const NEEDS = [
  { value: 'new-build', label: 'Something new built', phrase: 'a new build' },
  { value: 'existing', label: 'Work on an existing system', phrase: 'an existing system' },
  { value: 'hiring', label: 'A role', phrase: 'a role' },
  { value: 'other', label: 'Something else', phrase: 'something else' },
];

export function composeWhatsAppUrl({ name = '', need = '', message = '' }) {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`;
  const phrase = NEEDS.find((n) => n.value === need)?.phrase;

  const lines = [];
  if (name) lines.push(`Hello, I'm ${name}.`);
  if (phrase) lines.push(`I'm getting in touch about ${phrase}.`);
  if (message) lines.push(message);

  if (lines.length === 0) return base;
  return `${base}?text=${encodeURIComponent(lines.join('\n\n'))}`;
}

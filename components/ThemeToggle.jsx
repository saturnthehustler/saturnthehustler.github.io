'use client';

import { useEffect, useState } from 'react';

function current() {
  if (typeof document === 'undefined') return 'light';
  const stamped = document.documentElement.getAttribute('data-theme');
  if (stamped) return stamped;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => { setTheme(current()); }, []);

  function toggle() {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label="Use dark theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}

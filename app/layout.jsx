import { Instrument_Serif, Public_Sans } from 'next/font/google';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://saturnthehustler.github.io'),
  title: 'Abdirahman Hassan Abdi',
  description: 'Software engineer. I build the systems businesses run on.',
};

const PRE_PAINT = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-head wrap">
          <a href="/" className="site-name">Abdirahman Hassan Abdi</a>
          <nav><a href="/work/earlier/">Earlier work</a><ThemeToggle /></nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-foot wrap">
          <p>© 2026 Abdirahman Hassan Abdi</p>
        </footer>
      </body>
    </html>
  );
}

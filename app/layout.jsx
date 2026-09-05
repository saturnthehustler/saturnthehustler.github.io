export const metadata = {
  title: 'Abdirahman Hassan Abdi',
  description: 'Software engineer. I build the systems businesses run on.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

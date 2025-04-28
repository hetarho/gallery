import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

export const metadata: Metadata = {
  title: 'HaeRam',
  description: 'Portfolio',
};

const suit = localFont({
  src: './_fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
  display: 'swap',
  weight: '100 900',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={suit.className}>
      <body className="w-full bg-neutral-900">
        {children}
        <footer className="flex justify-center gap-4 text-white">
          <a href={`${process.env.NEXT_PUBLIC_MAIN_URL}`} target="_self">
            Home
          </a>
          <a href={`${process.env.NEXT_PUBLIC_NOTE_URL}`} target="_self">
            Note
          </a>
          <a href={`${process.env.NEXT_PUBLIC_GALLERY_URL}`} target="_self">
            Gallery
          </a>
          <a href={`${process.env.NEXT_PUBLIC_PROFILE_URL}`} target="_self">
            Profile
          </a>
        </footer>
      </body>
    </html>
  );
}

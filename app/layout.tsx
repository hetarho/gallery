import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HaeRam',
  description: 'Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full bg-stone-900">{children}</body>
    </html>
  );
}

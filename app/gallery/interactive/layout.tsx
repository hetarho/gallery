import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <div className="fixed left-4 top-4 font-thin text-white transition-transform hover:font-bold">
        <Link href={'/'}>HOME</Link>
      </div>
    </main>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function NoteHeader() {
  const pathname = usePathname();
  const isDetail = pathname.includes('/detail/');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isDetail) {
      setTitle(pathname.split('/').pop() || '');
    } else {
      setTitle('HaeRam note');
    }
  }, [isDetail, pathname]);

  return (
    <header className="flex items-center justify-between px-8 py-4">
      {isDetail && (
        <Link href="/" className="text-2xl font-bold">
          Back
        </Link>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <ThemeSwitch />
    </header>
  );
}

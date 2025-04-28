'use client';

import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { useMemo } from 'react';
import { NoteCardHeader } from './NoteCard';
export default function NoteHeader() {
  const pathname = usePathname();
  const isDetail = pathname.includes('/detail/');

  const title = useMemo(() => {
    if (isDetail) {
      const id = pathname.split('/').pop();
      return <NoteCardHeader title={`Note ${id}`} id={Number(id)} />;
    } else {
      return 'HaeRam note';
    }
  }, [isDetail, pathname]);

  return (
    <header className="flex items-center justify-between px-8 py-4">
      {isDetail && (
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <ThemeSwitch />
    </header>
  );
}

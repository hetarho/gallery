'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NoteCard({ index }: { index: number }) {
  return (
    <motion.div
      layoutId={`note-${index}`}
      className="border-mono-500 flex h-20 w-20 items-center justify-center rounded-2xl border-4 text-4xl font-bold"
    >
      <Link href={`/detail/${index}`}>{index}</Link>
    </motion.div>
  );
}

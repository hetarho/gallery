'use client';

import { cn } from '@/app/_lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

type NoteCardProps = React.PropsWithChildren<{
  index: number;
  className?: string;
}>;

export function NoteCard({ index, children, className }: NoteCardProps) {
  return (
    <motion.div
      layoutId={`note-${index}`}
      className={cn('overflow-hidden', className)}
    >
      {children}
    </motion.div>
  );
}

export function NoteCardHeader({ title, id }: { title: string; id: number }) {
  return (
    <motion.div
      layoutId={`note-header-${id}`}
      className="absolute right-1 bottom-1 z-10"
    >
      <h1>{title}</h1>
    </motion.div>
  );
}

export function NoteCardImage({ id, src }: { id: number; src: string }) {
  return (
    <motion.div
      layoutId={`note-content-${id}`}
      className="h-full w-full rounded-md"
    >
      <Image src={src} alt={src} fill className="object-cover"></Image>
    </motion.div>
  );
}

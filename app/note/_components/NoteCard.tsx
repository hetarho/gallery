'use client';

import { motion } from 'framer-motion';

export function NoteCard({
  index,
  title,
  content,
  className,
}: {
  index: number;
  title: string;
  content: string;
  className?: string;
}) {
  return (
    <div>
      <motion.div layoutId={`note-${index}`} className={className}>
        <NoteCardHeader title={title} id={index} />
        <NoteCardContent content={content} id={index} />
      </motion.div>
    </div>
  );
}

export function NoteCardHeader({ title, id }: { title: string; id: number }) {
  return (
    <motion.div layoutId={`note-header-${id}`}>
      <h1>{title}</h1>
    </motion.div>
  );
}

export function NoteCardContent({
  content,
  id,
}: {
  content: string;
  id: number;
}) {
  return (
    <motion.div layoutId={`note-content-${id}`}>
      <p>{content}</p>
    </motion.div>
  );
}

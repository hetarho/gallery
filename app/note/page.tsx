import AnimatedLayout from '../_components/animation/AnimatedLayout';
import Link from 'next/link';
import { NoteCard } from './_components/NoteCard';
export default function Note() {
  return (
    <AnimatedLayout className="flex flex-wrap justify-center gap-10 px-10 py-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <Link href={`/detail/${index}`} key={index}>
          <NoteCard
            index={index}
            title={`Note - ${index}`}
            content={`Note ${index}`}
            className="bg-mono-200 flex flex-col items-center justify-center rounded-2xl px-6 py-4"
          ></NoteCard>
        </Link>
      ))}
    </AnimatedLayout>
  );
}

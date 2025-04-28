import AnimatedLayout from '../_components/animation/AnimatedLayout';
import NoteCard from './_components/NoteCard';

export default function Note() {
  return (
    <AnimatedLayout className="flex flex-wrap justify-center gap-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <NoteCard key={index} index={index} />
      ))}
    </AnimatedLayout>
  );
}

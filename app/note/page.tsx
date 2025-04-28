import Link from 'next/link';
import AnimatedLayout from '../_components/animation/AnimatedLayout';

export default function Note() {
  return (
    <AnimatedLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <Link
            key={index}
            href={`/note/detail/${index}`}
            className="text-4xl font-bold text-white"
          >
            {index}
          </Link>
        ))}
      </div>
    </AnimatedLayout>
  );
}

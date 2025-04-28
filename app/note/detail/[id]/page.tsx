import AnimatedLayout from '@/app/_components/animation/AnimatedLayout';
import Link from 'next/link';

export default async function NoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AnimatedLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-4xl font-bold text-white">{id}</div>
        <Link href="/note" className="text-4xl font-bold text-white">
          Back
        </Link>
      </div>
    </AnimatedLayout>
  );
}

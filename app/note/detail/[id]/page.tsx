import AnimatedLayout from '@/app/_components/animation/AnimatedLayout';
import NoteCard from '../../_components/NoteCard';
export default async function NoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AnimatedLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <NoteCard index={Number(id)} />
      </div>
    </AnimatedLayout>
  );
}

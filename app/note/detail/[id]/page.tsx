import AnimatedLayout from '@/app/_components/animation/AnimatedLayout';
import { NoteCardImage } from '../../_components/NoteCard';
export default async function NoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cardImage = `/note/default${`${(Number(id) % 3) + 1}`.padStart(2, '0')}.png`;
  return (
    <AnimatedLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <NoteCardImage src={cardImage} id={Number(id)} />
      </div>
    </AnimatedLayout>
  );
}

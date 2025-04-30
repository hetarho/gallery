import AnimatedLayout from '../_components/animation/AnimatedLayout';
import Link from 'next/link';
import {
  NoteCard,
  NoteCardHeader,
  NoteCardImage,
} from './_components/NoteCard';
import { AspectRatio } from '../_components/ui/aspect-ratio';
export default function Note() {
  const CARD_NUM = 20;
  const cardImages = Array.from({ length: CARD_NUM }).map(() => {
    const index = `${Math.round(Math.random() * 2) + 1}`.padStart(2, '0');
    return `/note/default${index}.png`;
  });

  return (
    <AnimatedLayout className="flex flex-wrap justify-center gap-10 px-2 py-10">
      {Array.from({ length: CARD_NUM }).map((_, index) => (
        <Link href={`/detail/${index}`} key={index}>
          <NoteCard
            index={index}
            className="bg-mono-200 tablet:w-40 tablet:rounded-2xl relative flex w-25 flex-col items-center justify-center rounded-lg"
          >
            <NoteCardHeader title={`Note ${index}`} id={index}></NoteCardHeader>
            <AspectRatio ratio={16 / 9} className="absolute z-0">
              <NoteCardImage src={cardImages[index]} id={index} />
            </AspectRatio>
          </NoteCard>
        </Link>
      ))}
    </AnimatedLayout>
  );
}

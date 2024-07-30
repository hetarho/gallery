import Link from 'next/link';
import ArtFrame from './_ArtFrame';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';
import { RippleCanvas } from './components/canvas/Ripple/RippleCanvas';

export default function Home() {
  return (
    <main>
      <header className="select-none py-20 text-center text-5xl font-extrabold text-white">
        HeaRam&apos;s Gallery
      </header>
      <section className="flex justify-center">
        <div className="grid w-full grid-cols-auto-fill-96 justify-items-center gap-12 sm:w-[80vw]">
          <Link href={'/ripple'} className="w-full sm:w-96">
            <ArtFrame title="물결">
              <RippleCanvas color="#33a8de"></RippleCanvas>
            </ArtFrame>
          </Link>
          <ArtFrame title="번개">
            <ThunderCanvas></ThunderCanvas>
          </ArtFrame>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import ArtFrame from './_ArtFrame';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';
import RippleContents from './containers/mainContents/RippleContents';

export default function Home() {
  return (
    <main>
      <header className="select-none py-20 text-center text-5xl font-extrabold text-white">
        HeaRam&apos;s Gallery
      </header>
      <section className="flex justify-center">
        <div className="grid w-full grid-cols-auto-fill-96 justify-items-center gap-12 sm:w-[80vw]">
          <Link href={'/ripple'} className="w-full">
            <ArtFrame title="물결">
              <RippleContents />
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

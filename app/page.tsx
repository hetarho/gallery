import { RippleCanvas } from './components/canvas/Ripple/RippleCanvs';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';

export default function Home() {
  return (
    <main>
      <header className="select-none py-20 text-center text-5xl font-extrabold text-white">
        HeaRam&apos;s Gallery
      </header>
      <section className="flex justify-center">
        <div className="grid w-full grid-cols-auto-fill-96 justify-items-center gap-12 sm:w-[80vw]">
          <ArtFrame title="물결">
            <RippleCanvas color="#33a8de"></RippleCanvas>
          </ArtFrame>
          <ArtFrame title="번개">
            <ThunderCanvas></ThunderCanvas>
          </ArtFrame>
        </div>
      </section>
    </main>
  );
}

function ArtFrame({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="relative h-60 w-full overflow-hidden rounded-xl sm:w-96">
      {children}
      {/* <div
        className="absolute top-0 h-full w-full"
        style={{
          background:
            'linear-gradient(0deg, #000000A0, transparent,transparent)',
        }}
      ></div> */}
      <div className="absolute bottom-4 left-4 select-none text-4xl font-bold text-white">
        {title}
      </div>
    </div>
  );
}

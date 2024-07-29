import { RippleCanvas } from './components/canvas/Ripple/RippleCanvs';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';

export default function Home() {
  const artWorks: ArtWork[] = [
    { title: 'ripples', Component: RippleCanvas },
    { title: 'thunder', Component: ThunderCanvas },
  ];

  return (
    <main>
      <header className="select-none py-20 text-center text-5xl font-extrabold text-white">
        HeaRam&apos;s Gallery
      </header>
      <section className="flex justify-center">
        <div className="grid w-[80vw] grid-cols-auto-fill-96 justify-items-center gap-12">
          {artWorks.map(({ Component, title }, i) => (
            <div
              key={i}
              className="relative h-60 w-96 overflow-hidden rounded-xl"
            >
              <Component />
              <div
                className="absolute top-0 h-full w-full"
                style={{
                  background:
                    'linear-gradient(0deg, #000000A0, transparent,transparent)',
                }}
              ></div>
              <div className="absolute bottom-4 left-4 select-none text-4xl font-bold text-white">
                {title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

interface ArtWork {
  Component: () => JSX.Element;
  title: string;
}

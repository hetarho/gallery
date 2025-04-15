import Link from 'next/link';
import ArtFrame from '../_ArtFrame';
import DragAndDropProvider from '../provider/DragAndDripProvider';
import TitleText from '../_TitleText';
import RippleInteractive from '../components/canvas/works/RippleInteractive';
import ThunderPreview from '../components/canvas/preview/ThunderPreview';
import MonsterInteractive from '../interactive/monster/page';
import MiningInteractive from '../interactive/mining/page';

export default function Home() {
  return (
    <DragAndDropProvider>
      <Link href="/" className="text-4xl font-bold text-white">
        Home
      </Link>
      <main className="mb-40 flex w-full flex-col items-center">
        <header className="select-none py-10 text-center text-4xl font-extrabold text-white">
          <TitleText />
        </header>
        <section className="flex w-full max-w-screen-lg justify-center sm:px-10">
          <div className="grid w-full justify-items-center gap-12 sm:w-[80vw] sm:grid-cols-auto-fill-96">
            <Link href={'/interactive/ripple'} className="w-full sm:w-96">
              <ArtFrame title="Ripples">
                <RippleInteractive color="#33a8de"></RippleInteractive>
              </ArtFrame>
            </Link>
            <Link href={'/interactive/thunder'} className="w-full sm:w-96">
              <ArtFrame title="Thunder">
                <ThunderPreview></ThunderPreview>
              </ArtFrame>
            </Link>
            <Link href={'/interactive/monster'} className="w-full sm:w-96">
              <ArtFrame title="Monster">
                <MonsterInteractive></MonsterInteractive>
              </ArtFrame>
            </Link>
            <Link href={'/interactive/mining'} className="w-full sm:w-96">
              <ArtFrame title="Mining">
                <MiningInteractive></MiningInteractive>
              </ArtFrame>
            </Link>
          </div>
        </section>
      </main>
    </DragAndDropProvider>
  );
}

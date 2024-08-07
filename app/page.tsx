import Link from 'next/link';
import ArtFrame from './_ArtFrame';
import DragAndDropProvider from './provider/DragAndDripProvider';
import TitleText from './_TitleText';
import RippleInteractive from './components/canvas/works/RippleInteractive';
import ThunderPreview from './components/canvas/preview/ThunderPreview';

export default function Home() {
  return (
    <DragAndDropProvider>
      <main>
        <header className="select-none py-10 text-center text-4xl font-extrabold text-white">
          <TitleText />
        </header>
        <section className="flex justify-center px-10">
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
          </div>
        </section>
      </main>
    </DragAndDropProvider>
  );
}

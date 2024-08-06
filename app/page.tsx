'use client';

import Link from 'next/link';
import ArtFrame from './_ArtFrame';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';
import DragAndDropProvider from './provider/DragAndDripProvider';
import TitleText from './_TitleText';
import { motion } from 'framer-motion';
import RippleInteractive from './components/canvas/works/RippleInteractive';

export default function Home() {
  return (
    <DragAndDropProvider>
      <main>
        <motion.header className="select-none py-10 text-center text-4xl font-extrabold text-white">
          <TitleText />
        </motion.header>
        <motion.section className="flex justify-center px-10">
          <div className="grid w-full justify-items-center gap-12 sm:w-[80vw] sm:grid-cols-auto-fill-96">
            <Link href={'/ripple'} className="w-full sm:w-96">
              <ArtFrame title="Ripples">
                <RippleInteractive color="#33a8de"></RippleInteractive>
              </ArtFrame>
            </Link>
            <ArtFrame title="Thunder">
              <ThunderCanvas></ThunderCanvas>
            </ArtFrame>
          </div>
        </motion.section>
      </main>
    </DragAndDropProvider>
  );
}

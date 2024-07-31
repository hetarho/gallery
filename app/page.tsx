'use client';

import Link from 'next/link';
import ArtFrame from './_ArtFrame';
import ThunderCanvas from './components/canvas/Thunder/ThunderCanvas';
import { RippleCanvas } from './components/canvas/Ripple/RippleCanvas';
import DragAndDropProvider from './components/provider/DragAndDripProvider';
import TitleText from './_TitleText';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <DragAndDropProvider>
      <main>
        <motion.header
          className="select-none py-20 text-center text-5xl font-extrabold text-white"
          animate={{
            y: ['30vh', 0],
          }}
          transition={{ delay: 3, duration: 0.2 }}
        >
          <TitleText />
        </motion.header>
        <motion.section
          className="flex justify-center px-10"
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 3 }}
        >
          <div className="grid w-full justify-items-center gap-12 sm:w-[80vw] sm:grid-cols-auto-fill-96">
            <Link href={'/ripple'} className="w-full sm:w-96">
              <ArtFrame title="물결">
                <RippleCanvas color="#33a8de"></RippleCanvas>
              </ArtFrame>
            </Link>
            <ArtFrame title="번개">
              <ThunderCanvas></ThunderCanvas>
            </ArtFrame>
          </div>
        </motion.section>
      </main>
    </DragAndDropProvider>
  );
}

'use client';

import { pageVariants } from '@/app/_lib/motion/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

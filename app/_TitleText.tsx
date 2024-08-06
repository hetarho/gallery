'use client';

import { motion } from 'framer-motion';

export default function TitleText() {
  return (
    <div className="flex justify-center font-thin">
      {`HeaRam's Gallery`.split('').map((char, i) => {
        return (
          <motion.div
            key={`${char} ${i}`}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              delay: 0.12 * i,
              repeat: Infinity,
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}

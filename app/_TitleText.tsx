'use client';

import { motion } from 'framer-motion';

export default function TitleText() {
  return (
    <div className="flex justify-center">
      {`HeaRam's Gallery`.split('').map((char, i) => {
        return (
          <motion.div
            key={char}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              delay: 0.12 * i,
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}

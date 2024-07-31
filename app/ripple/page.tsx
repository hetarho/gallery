'use client';

import { RippleCanvas } from '../components/canvas/Ripple/RippleCanvas';
import { animate, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DragAndDropProvider from '../components/provider/DragAndDripProvider';
import DraggableCircle from './_DraggableCircle';

const COLORS = [
  '#4ad6b5',
  '#724ad6',
  '#88cf71',
  '#ddaf72',
  '#408fde',
  '#d46796',
  '#e4e390',
  'random',
];

export default function RipplePage() {
  const [color, setColor] = useState('#4ad6b5');
  const [prevColor, setPrevColor] = useState('#4ad6b5');
  const [rippleColor, setRippleColor] = useState('#4ad6b5');
  const [brightColor, setBrightColor] = useState('#4ad6b5');

  const [isOpenColorPalate, setIsOpenColorPalate] = useState(false);

  useEffect(() => {
    if (color !== prevColor) {
      animate(prevColor, color, {
        duration: 3,
        onUpdate: (latest) => {
          setBrightColor(latest);
          setRippleColor(latest);
        },
      });
    }
  }, [color, prevColor]);

  useEffect(() => {
    if (color === brightColor) setPrevColor(color);
  }, [color, brightColor]);

  return (
    <div className="flex h-screen w-screen justify-center">
      <DragAndDropProvider>
        <RippleCanvas
          color={color}
          rippleColor={rippleColor}
          brightColor={brightColor}
        ></RippleCanvas>
        <div
          className="fixed top-0 rounded-b-3xl bg-black bg-opacity-20 px-4 py-3 text-white"
          onClick={() => setIsOpenColorPalate((prev) => !prev)}
        >
          Toggle color palate
        </div>
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{
            y: isOpenColorPalate ? 0 : -200,
            opacity: isOpenColorPalate ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="fixed top-16 flex items-center justify-center gap-6 rounded-3xl bg-black bg-opacity-20 p-4"
        >
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((color) => {
              return (
                <div
                  onClick={() => {
                    setColor(color);
                    setRippleColor(color);
                    setBrightColor(color);
                  }}
                  key={color}
                  className="h-10 w-10 rounded-2xl"
                  style={{ background: color }}
                ></div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed bottom-12 flex items-center justify-center gap-6 rounded-full bg-black bg-opacity-10 p-6"
        >
          <DraggableCircle id="1" size={16} touch-action />
          <DraggableCircle id="2" size={24} touch-action />
          <DraggableCircle id="3" size={32} touch-action />
          <DraggableCircle id="4" size={48} touch-action />
        </motion.div>
      </DragAndDropProvider>
    </div>
  );
}

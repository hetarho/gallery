'use client';

import chroma from 'chroma-js';
import { useEffect, useState } from 'react';
import Monster from './_Monster';
import clsx from 'clsx';
import { Point } from '@/app/components/ts/types';
import MouseFollower from '@/app/components/tsx/MouseFollower';

export default function MonsterInteractive() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colors, setColors] = useState<string[]>([]);

  const row = 8;
  const col = 6;

  useEffect(() => {
    setColors(
      Array.from({ length: row * col }).map(() => chroma.random().hex()),
    );
  }, [row, col]);

  const [lightPoint, setLightPoint] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (window !== undefined) {
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;

      setLightPoint({ x: maxX / 2, y: maxY / 2 });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLightPoint((prev) => ({
        x: prev.x + Math.random() * 28 - 14,
        y: prev.y + Math.random() * 28 - 14,
      }));
    }, 75);
  }, [lightPoint]);

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}
    >
      <div className="absolute right-0 top-0">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={clsx(
            'absolute right-10 top-4 z-10 rounded-full bg-opacity-20 px-6 py-3 font-bold',
            {
              'bg-black': !isDarkMode,
              'bg-white': isDarkMode,
              'text-black': !isDarkMode,
              'text-white': isDarkMode,
            },
          )}
        >
          {isDarkMode ? 'light' : 'dark'}
        </button>
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute flex gap-12">
          {Array.from({ length: row }).map((_, i) => (
            <div key={i} className="flex flex-col gap-12">
              {Array.from({ length: col }).map((_, i2) => {
                return (
                  <Monster
                    key={`${i}-${i2}`}
                    color={colors[i * col + i2]}
                    isDarkMode={isDarkMode}
                    point={lightPoint}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="absolute">
          <MouseFollower point={lightPoint} transition="all 0.1s ease-in-out">
            <div
              className={clsx('z-20 h-3 w-3 rounded-full', {
                'bg-white': isDarkMode,
                'bg-black': !isDarkMode,
              })}
              style={{
                boxShadow: isDarkMode
                  ? '0 0 9px 8px white'
                  : '0 0 9px 8px black',
              }}
            ></div>
          </MouseFollower>
        </div>
      </div>
    </div>
  );
}

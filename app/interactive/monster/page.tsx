'use client';

import chroma from 'chroma-js';
import { useEffect, useState } from 'react';
import Monster from './_Monster';
import clsx from 'clsx';

export default function MonsterInteractive() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colors, setColors] = useState<string[]>([]);

  const row = 20;
  const col = 20;

  useEffect(() => {
    setColors(
      Array.from({ length: row * col }).map(() => chroma.random().hex()),
    );
  }, [row, col]);

  useEffect(() => {
    // 화면이 로드될 때와 리사이징될 때 높이 값을 업데이트합니다.
    if (typeof window === 'undefined') return;
    function updateVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // 초기 실행 및 resize 이벤트 등록
    updateVh();
    window.addEventListener('resize', updateVh);
  }, []);

  return (
    <div
      className="h-screen-dynamic w-screen overflow-hidden"
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
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

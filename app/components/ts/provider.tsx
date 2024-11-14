'use client';

import { createContext, useState } from 'react';
import { Point } from './types';
import { useThrottle } from '@/app/hooks/useThrottle';

export const MouseContext = createContext<MouseContextType>({
  mousePosition: { x: 0, y: 0 },
  isMouseOver: false,
});

export default function MouseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleMouseMove = useThrottle((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, 50);

  const handleMouseTouchMove = useThrottle((e: React.TouchEvent) => {
    setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, 50);

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseTouchMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onTouchStart={() => setIsMouseOver(true)}
      onTouchEnd={() => setIsMouseOver(false)}
    >
      <MouseContext.Provider value={{ mousePosition, isMouseOver }}>
        {children}
      </MouseContext.Provider>
    </div>
  );
}

export type MouseContextType = {
  mousePosition: Point;
  isMouseOver: boolean;
};

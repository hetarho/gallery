'use client';

import { useThrottle } from '@/app/_hooks/useThrottle';
import { createContext, useState } from 'react';
import { Point } from '../ts/types';

export const MouseContext = createContext<MouseContextType>({
  mousePosition: { x: 0, y: 0 },
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

  const handleMouseMove = useThrottle((e: React.MouseEvent) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  }, 50);

  const handleMouseTouchMove = useThrottle((e: React.TouchEvent) => {
    setMousePosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
  }, 50);

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseTouchMove}
      className="h-fit w-fit"
    >
      <MouseContext.Provider value={{ mousePosition }}>
        {children}
      </MouseContext.Provider>
    </div>
  );
}

export type MouseContextType = {
  mousePosition: Point;
};

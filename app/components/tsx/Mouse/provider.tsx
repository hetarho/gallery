'use client';

import { useThrottle } from '@/app/hooks/useThrottle';
import { MouseContextType, Position } from './type';
import { createContext, useState } from 'react';

export const MouseContext = createContext<MouseContextType>({
  mousePosition: { x: 0, y: 0 },
});

export default function MouseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useThrottle((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, 75);

  return (
    <div onMouseMove={handleMouseMove}>
      <MouseContext.Provider value={{ mousePosition }}>
        {children}
      </MouseContext.Provider>
    </div>
  );
}

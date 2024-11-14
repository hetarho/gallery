import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';
import { Point } from '../ts/types';

export default function MouseAvoider({
  children,
  transition,
  point,
  force = 1,
}: {
  children: React.ReactNode;
  transition?: string;
  point?: Point;
  force?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { mousePosition, isMouseOver } = useContext(MouseContext);
  const [target, setTarget] = useState<AnimationTarget>();
  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setTarget(new AnimationTarget(rect));
  }, []);

  useEffect(() => {
    target?.avoid({
      point: isMouseOver ? mousePosition : (point ?? mousePosition),
      force,
    });
  }, [force, mousePosition, point, target, isMouseOver]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

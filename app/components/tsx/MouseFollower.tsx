import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';
import { Point } from '../ts/types';

export default function MouseFollower({
  children,
  transition,
  point,
}: {
  children: React.ReactNode;
  transition?: string;
  force?: number;
  point?: Point;
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
    target?.follow({
      point: isMouseOver ? mousePosition : (point ?? mousePosition),
    });
  }, [mousePosition, point, target, isMouseOver]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';
import { Point } from '../ts/types';
export default function RotateByMouse({
  children,
  transition,
  point,
}: {
  children: React.ReactNode;
  transition?: string;
  point?: Point;
}) {
  const { mousePosition, isMouseOver } = useContext(MouseContext);
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<AnimationTarget>();
  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setTarget(new AnimationTarget(rect));
  }, []);

  useEffect(() => {
    target?.rotate({
      point: isMouseOver ? mousePosition : (point ?? mousePosition),
    });
  }, [mousePosition, point, target, isMouseOver]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

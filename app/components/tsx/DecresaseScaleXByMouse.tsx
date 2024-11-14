import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';

export default function DecreaseScaleXByMouse({
  children,
  transition,
  force = 1,
}: {
  children: React.ReactNode;
  transition?: string;
  force?: number;
}) {
  const { mousePosition: mousePosition } = useContext(MouseContext);
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<AnimationTarget>();
  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setTarget(new AnimationTarget(rect));
  }, []);

  useEffect(() => {
    target?.scaleXByPoint({ point: mousePosition, force });
  }, [mousePosition, target, force]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

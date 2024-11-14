import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';

export default function RotateByMouse({
  children,
  transition,
}: {
  children: React.ReactNode;
  transition?: string;
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
    target?.rotate({ point: mousePosition });
  }, [mousePosition, target]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

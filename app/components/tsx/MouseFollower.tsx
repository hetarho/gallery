import { useContext, useEffect, useRef, useState } from 'react';
import { MouseContext } from '../ts/provider';
import AnimationTarget from '../ts';

export default function MouseFollower({
  children,
  transition,
  force = 1,
}: {
  children: React.ReactNode;
  transition?: string;
  force?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { mousePosition: mousePosition } = useContext(MouseContext);
  const [target, setTarget] = useState<AnimationTarget>();
  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setTarget(new AnimationTarget(rect));
  }, []);

  useEffect(() => {
    target?.forward({ point: mousePosition, force });
  }, [force, mousePosition, target]);

  return (
    <div ref={ref} style={{ ...target?.style, transition }}>
      {children}
    </div>
  );
}

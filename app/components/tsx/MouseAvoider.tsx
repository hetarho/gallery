import { useContext, useEffect, useRef, useState } from 'react';
import AnimationTarget from '../ts';
import { MouseContext } from '../ts/MouseProvider';

export default function MouseAvoider({
  children,
  force = 1.5,
}: {
  children: React.ReactNode;
  force?: number;
}) {
  const { mousePosition } = useContext(MouseContext);
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<AnimationTarget>();
  const [transform, setTransform] = useState('');
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTarget(new AnimationTarget(rect));
  }, []);

  useEffect(() => {
    target?.avoid({ point: mousePosition, force });
    setTransform(target?.getTransform() ?? '');
  }, [mousePosition, target, force]);

  return (
    <div ref={ref} style={{ transform, transition: 'all 0.1s ease-in-out' }}>
      {children}
    </div>
  );
}

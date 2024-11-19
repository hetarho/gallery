import { useEffect } from 'react';

import { useState } from 'react';
import InteractionTarget from '../ts/InteractionTarget';
import useInView from '@/app/hooks/useInView';
import { PointWithGravity } from '../ts/types';

function Pop({
  children,
  isActive,
  delay = 0,
  angle = 60,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  delay?: number;
  angle?: number;
}) {
  const [target, setTarget] = useState<InteractionTarget>();
  const [distanceX, setDistanceX] = useState(0);
  const [distanceY, setDistanceY] = useState(0);
  const [currentRotate, setCurrentRotate] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [transform, setTransform] = useState('');
  const [gravity, setGravity] = useState<PointWithGravity>();
  const [rotate, setRotate] = useState(0);
  const [show, setShow] = useState(false);

  const { ref, isInView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTarget(new InteractionTarget(rect));
  }, [ref]);

  useEffect(() => {
    if (!gravity || isDone) return;

    const interval = setInterval(() => {
      gravity.update();
      const distance = gravity.point;
      setDistanceX(distance.x);
      setDistanceY(distance.y);
      setCurrentRotate((rotate * (gravity?.time ?? 0)) / 10);
    }, 50);
    return () => clear(interval);
  }, [gravity, isDone, rotate, isActive]);

  useEffect(() => {
    if (!isInView && distanceY < -200) {
      setIsDone(true);
    }
  }, [isInView, distanceY]);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setShow(true);
        setIsDone(false);
        setGravity(
          new PointWithGravity(
            Math.random() * 40 + 20,
            Math.random() * angle + (90 - angle / 2),
            7.5,
          ),
        );
        setRotate(Math.random() * 180);
      }, delay);
    }
  }, [delay, isActive, angle]);

  const clear = (interval: NodeJS.Timeout) => {
    clearInterval(interval);
    setDistanceX(0);
    setDistanceY(0);
    setCurrentRotate(0);
    setIsDone(true);
    setShow(false);
  };

  useEffect(() => {
    target?.moveVertical({ distance: distanceY });
    target?.moveHorizontal({ distance: distanceX });
    target?.rotate({ degree: currentRotate });
    setTransform(target?.getTransform() ?? '');
  }, [target, distanceX, distanceY, gravity, currentRotate]);

  return (
    <div
      ref={ref}
      className="absolute top-12 h-fit w-fit"
      style={{
        transform,
        transition: `transform 0.05s linear`,
        transformOrigin: 'center',
        opacity: show ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

const Pops = ({
  isActive,
  count,
  delay,
  pops,
}: {
  isActive: boolean;
  count: number;
  delay: number;
  pops: React.ReactNode[];
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Pop key={`${index}`} isActive={isActive} delay={delay}>
          {pops[index % pops.length]}
        </Pop>
      ))}
    </>
  );
};

export { Pop, Pops };

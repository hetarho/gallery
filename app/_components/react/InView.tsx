'use client';

import useInView from '@/app/_hooks/useInView';
import { useEffect, useState } from 'react';

export default function InView({
  children,
  fallback,
  root = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  root?: HTMLElement | null;
}) {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    root,
  });

  const [emptyWidth, setEmptyWidth] = useState(0);
  const [emptyHeight, setEmptyHeight] = useState(0);

  useEffect(() => {
    if (isInView) {
      setEmptyWidth(ref.current?.clientWidth ?? 0);
      setEmptyHeight(ref.current?.clientHeight ?? 0);
    }
  }, [isInView, ref]);

  return (
    <div ref={ref}>
      {isInView
        ? children
        : (fallback ?? (
            <div style={{ width: emptyWidth, height: emptyHeight }} />
          ))}
    </div>
  );
}

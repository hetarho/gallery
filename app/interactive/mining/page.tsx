'use client';

import chroma from 'chroma-js';
import { useCallback, useEffect, useState } from 'react';
import Mineral from './_Mineral';
import clsx from 'clsx';

export default function MiningInteractive({
  isPreview = false,
}: {
  isPreview?: boolean;
}) {
  const [color, setColor] = useState('#4ad6b5');
  const [size, setSize] = useState(1);

  const destroyCallback = useCallback(() => {
    setColor(chroma.random().hex());
  }, []);

  useEffect(() => {
    if (size !== 1 || color !== '#4ad6b5') {
      setSize((prev) => prev + 1);
    }
  }, [color]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center overflow-hidden bg-black',
        {
          'h-full w-full': isPreview,
          'h-screen w-screen': !isPreview,
        },
      )}
    >
      <Mineral color={color} size={size} destroyCallback={destroyCallback} />
    </div>
  );
}

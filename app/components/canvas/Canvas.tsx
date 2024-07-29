'use client';

import clsx from 'clsx';
import {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

type CanvasProps = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  reSizeCallback?: (width: number, height: number) => void;
};

const Canvas = forwardRef(
  (
    { reSizeCallback, className, ...props }: CanvasProps,
    canvasRef: Ref<HTMLCanvasElement> | undefined,
  ) => {
    const divRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (divRef?.current !== null) {
        setWidth(divRef.current.offsetWidth);
        setHeight(divRef.current.offsetHeight);

        const observer = new ResizeObserver(handleResize);
        observer.observe(divRef.current);

        return () => {
          observer.disconnect();
        };
      }
    }, [divRef]);

    useEffect(() => {
      if (!!reSizeCallback) reSizeCallback(width, height);
    }, [height, reSizeCallback, width]);

    function handleResize() {
      setWidth(divRef.current?.offsetWidth ?? 0);
      setHeight(divRef.current?.offsetHeight ?? 0);
    }
    return (
      <div className="h-full w-full" ref={divRef}>
        <canvas
          {...props}
          ref={canvasRef}
          className={clsx('h-full w-full', className)}
        ></canvas>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';

export default Canvas;

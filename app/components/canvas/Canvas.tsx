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

type CanvasProps = Omit<
  DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>,
  'onClick'
> & {
  reSizeCallback?: (width: number, height: number) => void;
  onClick?: ({ width, height, x, y }: CanvasOnClickProps) => void;
};

export type CanvasOnClickProps = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const Canvas = forwardRef(
  (
    { reSizeCallback, className, onClick, ...props }: CanvasProps,
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

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (canvasRef) {
        const canvas = (canvasRef as RefObject<HTMLCanvasElement>).current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (onClick) {
          onClick({
            width,
            height,
            x,
            y,
          });
        }

        console.log(`Mouse coordinates: (${x}, ${y})`);
      }
    };

    return (
      <div className="h-full w-full" ref={divRef}>
        <canvas
          {...props}
          onClick={handleCanvasClick}
          ref={canvasRef}
          className={clsx('h-full w-full', className)}
        ></canvas>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';

export default Canvas;

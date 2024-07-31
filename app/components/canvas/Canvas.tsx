'use client';

import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
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
  onClick?: (props: CanvasEventProps) => void;
  onDropEnd?: (props: CanvasEventProps) => void;
};

export interface CanvasEventProps {
  width: number;
  height: number;
  x: number;
  y: number;
  data?: object;
}

const Canvas = forwardRef(
  (
    { reSizeCallback, className, onDropEnd, onClick, ...props }: CanvasProps,
    canvasRef: Ref<HTMLCanvasElement> | undefined,
  ) => {
    const divRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [eventTest, setEventTest] = useState('');

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useDndMonitor({
      onDragEnd: handleCanvasDropEnd,
    });

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

    function handleCanvasDropEnd(event: DragEndEvent) {
      if (canvasRef) {
        const canvas = (canvasRef as RefObject<HTMLCanvasElement>).current;
        if (!canvas) return;

        setEventTest(JSON.stringify(event));

        const { clientX, clientY } = event.activatorEvent as PointerEvent;
        const { x: deltaX, y: deltaY } = event.delta;

        const rect = canvas.getBoundingClientRect();
        const x = clientX + deltaX - rect.left;
        const y = clientY + deltaY - rect.top;

        if (onDropEnd) {
          onDropEnd({
            width,
            height,
            x,
            y,
            data: event.active.data,
          });
        }
      }
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
        <div className="fixed top-0">{eventTest}</div>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';

export default Canvas;

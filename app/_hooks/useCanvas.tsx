import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import clsx from 'clsx';
import {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
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
  onAnimation?: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => void;
};

export interface CanvasEventProps {
  width: number;
  height: number;
  x: number;
  y: number;
  data?: object;
}

export default function useCanvas(ref: RefObject<HTMLCanvasElement>) {
  const [canvasRef] = useState(ref);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function Canvas({
    onAnimation,
    className,
    onDropEnd,
    onClick,
    ...props
  }: CanvasProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const requestAnimationIdRef = useRef(0);

    useDndMonitor({
      onDragEnd: handleCanvasDropEnd,
    });

    useEffect(() => {
      window.cancelAnimationFrame(requestAnimationIdRef.current);

      const canvas = getCanvas();
      if (canvas !== null) {
        canvas.width = width;
        canvas.height = height;
      }

      const callback = () => {
        const ctx = getCtx();
        if (ctx === null) return;
        if (!!!onAnimation) return;

        onAnimation(ctx, width, height);

        requestAnimationIdRef.current = window.requestAnimationFrame(callback);
      };

      // 리퀘스트 애니메이션 초기화
      requestAnimationIdRef.current = window.requestAnimationFrame(callback);
      return () => {
        // 기존 리퀘스트 애니메이션 캔슬
        window.cancelAnimationFrame(requestAnimationIdRef.current);
      };
    }, [onAnimation]);

    useEffect(() => {
      if (divRef?.current !== null) {
        const observer = new ResizeObserver(handleResize);
        observer.observe(divRef.current);

        return () => {
          observer.disconnect();
        };
      }
    }, [divRef]);

    function handleResize() {
      setWidth(divRef.current?.offsetWidth ?? 0);
      setHeight(divRef.current?.offsetHeight ?? 0);
    }

    function handleCanvasDropEnd(event: DragEndEvent) {
      if (canvasRef) {
        const canvas = (canvasRef as RefObject<HTMLCanvasElement>).current;
        if (!canvas) return;

        if (event.active?.rect?.current?.translated != null) {
          const { top: y, left: x } = event.active.rect.current.translated;

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
      </div>
    );
  }

  function resize(width: number, height: number) {
    const canvas = getCanvas();
    if (canvas === null) return;
    canvas.width = width;
    canvas.height = height;
    setWidth(width);
    setHeight(height);
  }

  function checkCanvasRendered() {
    const canvas = getCanvas();
    if (canvas === null) return false;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return false;
    else return true;
  }

  function getCanvas() {
    return canvasRef.current;
  }

  function getCtx() {
    if (checkCanvasRendered()) {
      const canvas = getCanvas();
      const ctx = canvas!.getContext('2d');
      return ctx;
    } else return null;
  }

  return {
    width,
    height,
    getCtx,
    resize,
    Canvas,
  };
}

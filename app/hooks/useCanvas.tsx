import { RefObject, useRef, useState } from 'react';

export default function useCanvas(ref: RefObject<HTMLCanvasElement>) {
  const [canvasRef] = useState(ref);
  const requestAnimationIdRef = useRef(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    requestAnimationIdRef,
    width,
    height,
    getCtx,
    resize,
  };
}

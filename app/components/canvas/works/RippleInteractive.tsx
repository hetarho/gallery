'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas, { CanvasEventProps } from '../Canvas';
import useCanvas from '@/app/hooks/useCanvas';
import BrightCircles from '../BrightCircle/BrightCircle';
import Ripple from '../Ripple/Ripple';

type RippleInteractiveProp = {
  color: string;
  rippleColor?: string;
  brightColor?: string;
};

export default function RippleInteractive({
  color,
  rippleColor,
  brightColor,
}: RippleInteractiveProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getCtx, width, height, resize, requestAnimationIdRef } =
    useCanvas(canvasRef);
  const [innerRippleList, setInnerRippleList] = useState<Ripple[]>([]);
  const [brightCircleList, setBrightCircleList] = useState<BrightCircles[]>([]);

  useEffect(() => {
    setBrightCircleList(
      Array.from(Array(Math.round(100))).map(() => {
        return new BrightCircles({
          color: color,
          height: height,
          width: width,
        });
      }),
    );
  }, [color, height, width]);

  useEffect(() => {
    if (brightColor !== undefined)
      brightCircleList.forEach((bright) => (bright.color = brightColor));
  }, [brightCircleList, brightColor]);

  const resizeFunction = useCallback(
    (width: number, height: number) => {
      resize(width, height);
    },
    [resize],
  );

  useEffect(() => {
    window.cancelAnimationFrame(requestAnimationIdRef.current);
    const onAnimation = () => {
      const ctx = getCtx();
      if (ctx === null) return;

      // Canvas 초기화
      ctx.clearRect(0, 0, width, height);

      innerRippleList.forEach((ripples) => ripples.draw(ctx));
      brightCircleList.forEach((brightCircle) => brightCircle.draw(ctx));

      requestAnimationIdRef.current = window.requestAnimationFrame(onAnimation);
    };

    // 리퀘스트 애니메이션 초기화
    requestAnimationIdRef.current = window.requestAnimationFrame(onAnimation);
    return () => {
      // 기존 리퀘스트 애니메이션 캔슬
      window.cancelAnimationFrame(requestAnimationIdRef.current);
    };
  }, [
    brightCircleList,
    getCtx,
    height,
    innerRippleList,
    requestAnimationIdRef,
    width,
  ]);

  function addRipple({ x, y, width, height, data }: CanvasEventProps) {
    const size = (data as { current: { size: number } }).current.size;
    console.log('addRipple');
    setInnerRippleList((prev) => [
      ...prev.filter((ripple) => !ripple.isEnd),
      new Ripple({
        color: rippleColor ?? color,
        depth: size / 50,
        frequency: size / 2,
        rippleNum: Math.round(size / 8),
        height,
        width,
        x,
        y,
      }),
    ]);
  }

  useEffect(() => {
    if (rippleColor !== undefined)
      innerRippleList.forEach((ripple) => (ripple.color = rippleColor));
  }, [innerRippleList, rippleColor]);

  return (
    <Canvas
      ref={canvasRef}
      onDropEnd={addRipple}
      reSizeCallback={resizeFunction}
      style={{ background: color, transition: '3s' }}
    ></Canvas>
  );
}

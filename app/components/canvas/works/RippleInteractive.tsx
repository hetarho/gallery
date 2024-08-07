'use client';
import { useEffect, useRef, useState } from 'react';
import useCanvas, { CanvasEventProps } from '@/app/hooks/useCanvas';
import BrightCircles from '../core/BrightCircle/BrightCircle';
import Ripple from '../core/Ripple/Ripple';

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
  const { width, height, Canvas } = useCanvas(canvasRef);
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

  function onAnimation(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, width, height);

    innerRippleList.forEach((ripples) => ripples.draw(ctx));
    brightCircleList.forEach((brightCircle) => brightCircle.draw(ctx));
  }

  function addRipple({ x, y, width, height, data }: CanvasEventProps) {
    const size = (data as { current: { size: number } }).current.size;
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
      onAnimation={onAnimation}
      onDropEnd={addRipple}
      style={{ background: color, transition: '3s' }}
    ></Canvas>
  );
}

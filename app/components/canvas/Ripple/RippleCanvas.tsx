'use client';
import chroma from 'chroma-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas, { CanvasEventProps } from '../Canvas';
import { Ripple } from './Ripple';

type RippleCanvasProp = {
  color: string;
};

export function RippleCanvas({ color }: RippleCanvasProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [innerRippleList, setInnerRippleList] = useState<Ripple[]>([]);
  const [brightCircleList, setBrightCircleList] = useState<BrightCircles[]>([]);
  const requestAnimationIdRef = useRef(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setBrightCircleList(
      Array.from(Array(Math.round(100))).map(() => {
        return new BrightCircles({
          color,
          height: height,
          width: width,
        });
      }),
    );
  }, [color, height, width]);

  const resizeFunction = useCallback(
    (width: number, height: number) => {
      window.cancelAnimationFrame(requestAnimationIdRef.current);
      const canvas = canvasRef.current;
      if (!canvas) return; // canvas가 null인지 확인
      const ctx = canvas.getContext('2d');
      if (!ctx) return; // context가 null인지 확인

      canvas.width = width;
      canvas.height = height;

      setWidth(width);
      setHeight(height);

      const onAnimation = () => {
        // Canvas 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        innerRippleList.forEach((ripples) => ripples.draw(ctx));
        brightCircleList.forEach((brightCircle) => brightCircle.draw(ctx));

        requestAnimationIdRef.current =
          window.requestAnimationFrame(onAnimation);
      };

      // 리퀘스트 애니메이션 초기화
      requestAnimationIdRef.current = window.requestAnimationFrame(onAnimation);
      return () => {
        // 기존 리퀘스트 애니메이션 캔슬
        window.cancelAnimationFrame(requestAnimationIdRef.current);
      };
    },
    [brightCircleList, innerRippleList],
  );

  function addRipple({ x, y, width, height, data }: CanvasEventProps) {
    const size = (data as { current: { size: number } }).current.size;
    setInnerRippleList((prev) => [
      ...prev.filter((ripple) => !ripple.isEnd),
      new Ripple({
        color,
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

  return (
    <Canvas
      ref={canvasRef}
      onDropEnd={addRipple}
      reSizeCallback={resizeFunction}
      style={{ background: color }}
    ></Canvas>
  );
}

type BrightCirclesData = {
  width: number;
  height: number;
  color: string;
};

class BrightCircles {
  width: number;
  height: number;
  posX: number;
  posY: number;
  color: string;
  brightness: number;
  speed: number;
  radius: number;
  alpha: number;
  constructor(data: BrightCirclesData) {
    const { width, height, color } = data;
    this.width = width;
    this.height = height;
    this.alpha = Math.random() * 0.4 + 0.15;
    this.brightness = Math.random() * 2 + 0.5;
    this.color = color;
    this.posX = Math.random() * width;
    this.posY = Math.random() * height;
    this.radius =
      (Math.random() * Math.min(width, height)) / 8 +
      Math.min(width, height) / 8;
    this.speed = Math.random() * 3 + 5;
  }

  minMax(value: number, { max, min }: { min: number; max: number }) {
    return Math.max(min, Math.min(max, value));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.posX = this.minMax(this.posX + (Math.random() - 0.5) * this.speed, {
      min: 0,
      max: this.width,
    });

    this.posY = this.minMax(this.posY + (Math.random() - 0.5) * this.speed, {
      min: 0,
      max: this.height,
    });

    this.alpha = this.minMax(this.alpha + (Math.random() - 0.5) * 0.02, {
      min: 0,
      max: 0.55,
    });

    this.brightness = this.minMax(
      this.brightness + (Math.random() - 0.5) * 0.1,
      {
        min: 0.5,
        max: 2.5,
      },
    );

    this.radius = this.minMax(
      this.radius + (Math.random() - 0.5) * this.speed * 0.02,
      {
        min: Math.min(this.width, this.height) / 16,
        max: Math.min(this.width, this.height) / 4,
      },
    );

    const color = chroma(this.color)
      .brighten(this.brightness)
      .alpha(this.alpha)
      .hex();

    const gradient = ctx.createRadialGradient(
      this.posX,
      this.posY,
      0,
      this.posX,
      this.posY,
      this.radius,
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, chroma(color).alpha(0).hex());

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

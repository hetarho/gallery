'use client';
import chroma from 'chroma-js';
import { useRef, useState } from 'react';
import Canvas, { CanvasOnClickProps } from '../Canvas';
import { Ripple } from './Ripple';

type RippleCanvasProp = {
  rippleList: Ripple[];
  color: string;
  interactive?: boolean;
};

export function RippleCanvas({
  color,
  rippleList,
  interactive = false,
}: RippleCanvasProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [innerRippleList, setInnerRippleList] = useState<Ripple[]>([]);

  function resizeFunction(width: number, height: number) {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvas가 null인지 확인
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // context가 null인지 확인

    canvas.width = width;
    canvas.height = height;

    let requestAnimationId: number;

    setInnerRippleList(
      interactive
        ? Array.from({ length: Math.round(width / 10) }).map(() => {
            return new Ripple({
              colors: [
                {
                  color: chroma(color).brighten(0.2).hex(),
                  stop: 0.33,
                },
                {
                  color: chroma(color).darken(0.2).hex(),
                  stop: 0.67,
                },
              ],
              startDelay: Math.random() * 150,
              bgColor: color,
              frequency: Math.random() * 20 + 15,
              rippleNum: Math.random() * 10 + 2,
              delay: Math.random() * 100 + 10,
              height,
              width,
              x: Math.random() * width,
              y: Math.random() * height,
            });
          })
        : rippleList,
    );

    const brightCircleList = Array.from(Array(Math.round(width / 7))).map(
      () => {
        return new BrightCircles({ color, height, width });
      },
    );

    const onAnimation = () => {
      // Canvas 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      innerRippleList.forEach((ripples) => ripples.draw(ctx));
      brightCircleList.forEach((brightCircle) => brightCircle.draw(ctx));

      requestAnimationId = window.requestAnimationFrame(onAnimation);
    };

    // 리퀘스트 애니메이션 초기화
    requestAnimationId = window.requestAnimationFrame(onAnimation);
    return () => {
      // 기존 리퀘스트 애니메이션 캔슬
      window.cancelAnimationFrame(requestAnimationId);
    };
  }

  function onClick({ x, y, width, height }: CanvasOnClickProps) {
    setInnerRippleList((prev) => [
      ...prev,
      new Ripple({
        colors: [
          {
            color: chroma(color).brighten(0.2).hex(),
            stop: 0.33,
          },
          {
            color: chroma(color).darken(0.2).hex(),
            stop: 0.67,
          },
        ],
        startDelay: Math.random() * 150,
        bgColor: color,
        frequency: Math.random() * 20 + 15,
        rippleNum: Math.random() * 10 + 2,
        delay: Math.random() * 100 + 10,
        height,
        width,
        x,
        y,
      }),
    ]);
  }

  return (
    <Canvas
      onClick={onClick}
      ref={canvasRef}
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

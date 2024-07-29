'use client';
import chroma from 'chroma-js';
import { useRef, useState } from 'react';
import Canvas from '../Canvas';

export function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color] = useState('#33a8de');

  function resizeFunction(width: number, height: number) {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvas가 null인지 확인
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // context가 null인지 확인

    canvas.width = width;
    canvas.height = height;

    let requestAnimationId: number;

    const lightColor = chroma(color).brighten(0.2).hex();
    const darkColor = chroma(color).darken(0.2).hex();

    const ripplesList = Array.from(Array(20)).map(() => {
      return new Ripples({
        colors: [
          {
            color: lightColor,
            stop: 0.33,
          },
          {
            color: darkColor,
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
    });

    const brightCircleList = Array.from(Array(100)).map(() => {
      return new BrightCircles({ color, height, width });
    });

    const onAnimation = () => {
      // Canvas 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripplesList.forEach((ripples) => ripples.draw(ctx));
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

  return (
    <Canvas
      ref={canvasRef}
      reSizeCallback={resizeFunction}
      style={{ background: color }}
    ></Canvas>
  );
}

type RipplesDate = {
  x: number;
  y: number;
  width: number;
  height: number;
  rippleNum: number;
  frequency: number;
  bgColor: string;
  delay: number;
  colors: ColorStop[];
  startDelay: number;
};

type ColorStop = {
  color: string;
  stop: number;
};

class Ripples {
  x: number;
  y: number;
  rippleNum: number;
  frequency: number;
  curr: number;
  width: number;
  height: number;
  speed: number;
  delay: number;
  size: number;
  startDelay: number;
  bgColor: string;
  colors: ColorStop[];

  constructor(data: RipplesDate) {
    const {
      x,
      y,
      width,
      height,
      rippleNum,
      frequency,
      bgColor,
      delay,
      colors,
      startDelay,
    } = data;
    this.x = x;
    this.y = y;
    this.rippleNum = rippleNum;
    this.width = width;
    this.height = height;
    this.frequency = frequency;
    this.delay = delay;
    this.startDelay = startDelay;
    this.colors = colors;
    this.bgColor = bgColor;
    this.curr = Math.random() + 1;
    this.speed = Math.random() * 0.4 + 0.2;
    this.size = Math.random() * 30 + 30;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.startDelay > 0) {
      this.startDelay -= this.speed;
      return;
    }
    this.curr += this.speed;

    const totalAmount = this.frequency * this.rippleNum + this.delay;

    const maxDistance = Math.sqrt(
      Math.pow(this.width / 2 + Math.abs(this.x - this.width / 2), 2) +
        Math.pow(this.height / 2 + Math.abs(this.y - this.height / 2), 2),
    );

    const curr =
      this.curr <= maxDistance + totalAmount
        ? this.curr
        : maxDistance + ((this.curr - maxDistance - totalAmount) % totalAmount);

    const rippleNum =
      Math.floor(curr / totalAmount) * this.rippleNum +
      Math.min(curr % totalAmount, this.frequency * this.rippleNum) /
        this.frequency;

    for (let i = 0; i < rippleNum; i++) {
      const radius =
        curr - i * this.frequency - Math.floor(i / this.rippleNum) * this.delay;

      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        radius,
        this.x,
        this.y,
        radius +
          (this.size * (radius * 5 + (maxDistance + totalAmount))) /
            (maxDistance + totalAmount),
      );

      const colorOpacity = Math.floor(200 * Math.pow(0.9, radius / 10));

      gradient.addColorStop(0, this.bgColor + '00');
      this.colors.forEach(({ color, stop }) => {
        gradient.addColorStop(
          stop,
          color + colorOpacity.toString(16).padStart(2, '0'),
        );
      });
      gradient.addColorStop(1, this.bgColor + '00');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
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

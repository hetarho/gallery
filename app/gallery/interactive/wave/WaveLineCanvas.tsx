'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

export default function WaveLineCanvas({ colors }: { colors: string[] }) {
  const divRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const canvasRef: RefObject<HTMLCanvasElement | null> =
    useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(200);

  const [waves, setWaves] = useState<Wave[]>([]);

  useEffect(() => {
    if (divRef?.current !== null) {
      setWidth(divRef.current.offsetWidth);
      setHeight(divRef.current.offsetHeight);

      const observer = new ResizeObserver(handleResize);
      observer.observe(divRef.current);
    }
  }, [divRef]);

  function handleResize() {
    setWidth(divRef.current?.offsetWidth ?? 0);
    setHeight(divRef.current?.offsetHeight ?? 0);
  }

  useEffect(() => {
    if (canvasRef?.current) {
      setWaves(colors.map((v) => new Wave(v, 30)));

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      setCtx(context);
    }
  }, [canvasRef, colors]);

  useEffect(() => {
    let requestAnimationId: number;

    if (ctx !== null) {
      waves.forEach((wave) => {
        wave.resize(width, height);
      });

      const onAnimation = () => {
        ctx.clearRect(0, 0, width, height);
        waves.forEach((wave) => {
          wave.draw(ctx);
        });

        requestAnimationId = window.requestAnimationFrame(onAnimation);
      };

      // 리퀘스트 애니메이션 초기화
      requestAnimationId = window.requestAnimationFrame(onAnimation);
    }

    return () => {
      // 기존 리퀘스트 애니메이션 캔슬
      window.cancelAnimationFrame(requestAnimationId);
    };
  }, [ctx, height, waves, width]);

  return (
    <div ref={divRef} className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export class Point {
  x: number;
  y: number;
  fieldY: number;
  speed: number;
  cur: number;
  max: number;
  constructor(index: number, x: number, y: number, fieldY: number) {
    this.x = x;
    this.y = y;
    this.fieldY = fieldY;
    this.speed = Math.random() / 40 + 0.02;
    this.cur = index;
    this.max = Math.random() * 100 + 15;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fieldY + Math.sin(this.cur) * this.max;
  }
}

export class Wave {
  color: string;
  stageWidth?: number;
  stageHeight?: number;
  centerX?: number;
  centerY?: number;
  pointGap?: number;
  point?: Point;
  points: Point[];
  reversePoints: Point[];
  numberOfPoints: number;
  max: number;
  constructor(color: string, max: number) {
    this.color = color;
    this.points = [];
    this.reversePoints = [];
    this.numberOfPoints = 10;
    this.max = max;
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.numberOfPoints = Math.round(stageWidth / 50);

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

    this.init();
  }

  init() {
    this.numberOfPoints = Math.round(this.stageWidth! / 50);
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points[i] = new Point(
        i,
        this.pointGap! * i,
        this.centerY!,
        this.centerY! * 0.5,
      );
      this.points[i].max = this.max;
    }

    for (let i = 0; i < this.numberOfPoints; i++) {
      this.reversePoints[i] = new Point(
        this.numberOfPoints - i - 1,
        this.pointGap! * i,
        this.centerY!,
        this.centerY! * 1.5,
      );
      this.reversePoints[i].max = this.max;
    }
  }

  drawPoints(
    points: Point[],
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isReverse: boolean = false,
  ) {
    ctx.moveTo(startX, startY);
    let prevX = startX;
    let prevY = startY;

    for (
      let i = isReverse ? this.numberOfPoints - 1 : 0;
      isReverse ? i >= 0 : i < this.numberOfPoints;
      isReverse ? i-- : i++
    ) {
      const cx = (prevX + points[i].x) / 2;
      const cy = (prevY + points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = points[i].x;
      prevY = points[i].y;

      points[i].update();
    }
    ctx.lineTo(endX, endY);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();

    this.drawPoints(
      this.points,
      ctx,
      0,
      this.centerY! / 2,
      this.stageWidth!,
      this.centerY! / 2,
    );

    ctx.lineTo(this.stageWidth!, this.centerY! * 1.5);

    this.drawPoints(
      this.reversePoints,
      ctx,
      this.stageWidth!,
      this.centerY! * 1.5,
      0,
      this.centerY! * 1.5,
      true,
    );

    ctx.lineTo(0, this.centerY! / 2);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

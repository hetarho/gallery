'use client';
import { useEffect, useRef, useState } from 'react';
import { ThunderLinePoint } from './ThunderLinePoint';
import { Thunder } from './Thunder';
import useCanvas from '@/app/hooks/useCanvas';

export default function ThunderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { Canvas, width, height } = useCanvas(canvasRef);
  const [lines, setLines] = useState<Thunder[]>([]);
  const [color] = useState('linear-gradient(225deg, #8f18ff9d, #000e4f7c)');

  useEffect(() => {
    const newLines = Array.from(Array(20)).map(() => {
      const startPointX =
        Math.random() > 0.5 ? -10 : (Math.random() * width) / 2;
      let startPointY = 0;
      if (startPointX === -10) {
        startPointY = Math.random() * height;
      } else {
        startPointY = Math.random() > 0.5 ? -10 : height + 10;
      }

      const startPoint = new ThunderLinePoint(startPointX, startPointY);

      let endPoint: ThunderLinePoint;
      if (startPoint.x === -10) {
        const endPointX =
          Math.random() > 0.5
            ? width + 10
            : (Math.random() * width) / 2 + width / 2;

        let endPointY = 0;
        if (endPointX === width + 10) {
          endPointY = Math.random() * height;
        } else {
          endPointY = Math.random() > 0.5 ? -10 : height + 10;
        }
        endPoint = new ThunderLinePoint(endPointX, endPointY);
      } else {
        if (startPoint.y === -10) {
          const endPointY =
            Math.random() > 1 / 3
              ? height + 10
              : (Math.random() * width) / 2 + width / 2;
          let endPointX;
          if (endPointY === height + 10) {
            endPointX = (Math.random() * width) / 2 + width / 2;
          } else {
            endPointX = width + 10;
          }
          endPoint = new ThunderLinePoint(endPointX!, endPointY);
        } else {
          const endPointY =
            Math.random() > 1 / 3 ? -10 : (Math.random() * width) / 2;
          let endPointX;
          if (endPointY === -10) {
            endPointX = (Math.random() * width) / 2;
          } else {
            endPointX = width + 10;
          }
          endPoint = new ThunderLinePoint(endPointX!, endPointY);
        }
      }

      return new Thunder({
        amplitude: 0,
        frequency: 50,
        width: Math.random() * 2 + 2,
        color: '#FFFFFFF8',
        startPoint: startPoint,
        endPoint: endPoint!,
      });
    });
    setLines(newLines);
  }, [height, width]);

  function onAnimation(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, width, height);
    lines.forEach((line) => line.draw(ctx));
  }

  return (
    <Canvas
      ref={canvasRef}
      style={{ background: color }}
      onAnimation={onAnimation}
    ></Canvas>
  );
}

'use client';
import { useRef, useState } from 'react';
import Canvas from '../Canvas';
import { ThunderLinePoint } from './ThunderLinePoint';
import { Thunder } from './Thunder';

export default function ThunderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color] = useState('linear-gradient(225deg, #8f18ff9d, #000e4f7c)');

  function resizeFunction(width: number, height: number) {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvas가 null인지 확인
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // context가 null인지 확인
    canvas.width = width;
    canvas.height = height;

    let requestAnimationId: number;

    const lines = Array.from(Array(20)).map(() => {
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

    const onAnimation = () => {
      // Canvas 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => line.draw(ctx));

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

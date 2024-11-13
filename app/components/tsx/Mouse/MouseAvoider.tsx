"use client";

import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { MouseContext } from "./provider";
import {
  distanceMouseFromRectCenter,
  getTriangleFuncFromRectAndMousePos,
} from "./utils";

export default function MouseAvoider({
  children,
  spring = 1,
  style,
  callback,
}: {
  children?: React.ReactNode;
  spring?: number;
  style?: React.CSSProperties;
  callback?: (moveDistance: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { mousePosition } = useContext(MouseContext);

  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    setRect(ref.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (!rect) return;

    const distance = distanceMouseFromRectCenter(rect, mousePosition);

    const { sin, cos } = getTriangleFuncFromRectAndMousePos(
      rect,
      mousePosition
    );

    const maxMoveLength = (200 * spring + 10) / (0 + 1 * spring);
    const moveLength = (200 * spring + 10) / (distance + 1 * spring);

    if (distance > 300) {
      setPosition({ x: 0, y: 0 });
      callback?.(0);
      return;
    }
    setPosition({
      x: -moveLength * cos,
      y: -moveLength * sin,
    });
    callback?.(moveLength / maxMoveLength);
  }, [callback, mousePosition, rect, spring]);

  const transform = useMemo(() => {
    return `translate(${position.x}px, ${position.y}px)`;
  }, [position.x, position.y]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transform,
        transition: "transform 0.1s ease-in-out",
        zIndex: position.x === 0 && position.y === 0 ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
}

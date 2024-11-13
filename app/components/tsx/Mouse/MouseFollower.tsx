"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MouseFollowerProps } from "./type";
import { MouseContext } from "./provider";
import {
  distanceMouseFromRectCenter,
  getTriangleFuncFromRectAndMousePos,
} from "./utils";

export default function MouseFollower({
  children,
  spring = 1,
}: MouseFollowerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { mousePosition } = useContext(MouseContext);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const { sin, cos } = getTriangleFuncFromRectAndMousePos(
      rect,
      mousePosition
    );

    const moveLength =
      Math.log(distanceMouseFromRectCenter(rect, mousePosition) + 1) ** spring;

    setPosition({
      x: moveLength * cos,
      y: moveLength * sin,
    });
  }, [mousePosition, spring]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition:
          "transform 0.1s ease-out, width 0.3s ease-out, height 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
}

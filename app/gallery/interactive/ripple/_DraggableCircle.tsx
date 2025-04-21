'use client';

import { useDraggable } from '@dnd-kit/core';

export default function DraggableCircle({
  id,
  size,
}: {
  id: string;
  size: number;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      size,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        boxShadow: '0px 0px 14px 6px white',
      }
    : { transition: '0.3s' };

  return (
    <div
      ref={setNodeRef}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...listeners}
      {...attributes}
      className="rounded-full bg-white"
    />
  );
}

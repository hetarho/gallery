'use client';

import { RippleCanvas } from '../components/canvas/Ripple/RippleCanvas';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import React from 'react';

export default function RipplePage() {
  return (
    <div className="flex h-screen w-screen justify-center">
      <DndContext>
        <RippleCanvas color="#4ad6b5"></RippleCanvas>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="fixed bottom-12 flex items-center justify-center gap-6 rounded-full bg-black bg-opacity-10 p-6"
        >
          <DraggableCircle id="1" size={16} touch-action />
          <DraggableCircle id="2" size={24} touch-action />
          <DraggableCircle id="3" size={32} touch-action />
          <DraggableCircle id="4" size={48} touch-action />
        </motion.div>
      </DndContext>
    </div>
  );
}

function DraggableCircle({ id, size }: { id: string; size: number }) {
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

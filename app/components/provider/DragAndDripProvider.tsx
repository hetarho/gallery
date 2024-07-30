'use client';

import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

export default function DragAndDropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor);

  return <DndContext sensors={sensors}>{children}</DndContext>;
}

'use client';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { RippleCanvas } from '../components/canvas/Ripple/RippleCanvas';
import clsx from 'clsx';

export default function RipplePage() {
  return (
    <DragDropContext
      onDragEnd={(e) => {
        console.log(e);
      }}
    >
      <Droppable droppableId="0">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex h-screen w-screen justify-center"
          >
            <RippleCanvas color="#4ad6b5"></RippleCanvas>
            <div className="fixed top-10 flex items-center justify-center gap-4 rounded-3xl bg-black bg-opacity-10 p-4">
              <Draggable draggableId="0" index={0}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={clsx('h-4 w-4 rounded-full bg-white', {
                      'shadow-2xl shadow-white': snapshot.isDragging,
                    })}
                  ></div>
                )}
              </Draggable>
              <Draggable draggableId="1" index={1}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={clsx('h-8 w-8 rounded-full bg-white', {
                      'shadow-2xl shadow-white': snapshot.isDragging,
                    })}
                  ></div>
                )}
              </Draggable>
              <Draggable draggableId="2" index={2}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={clsx('h-10 w-10 rounded-full bg-white', {
                      'shadow-2xl shadow-white': snapshot.isDragging,
                    })}
                  ></div>
                )}
              </Draggable>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

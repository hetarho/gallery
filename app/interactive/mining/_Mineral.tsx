import { Pops } from '@/app/components/react/Pop';
import chroma from 'chroma-js';
import { useEffect } from 'react';

import { useState } from 'react';

type MineralProps = {
  color: string;
  size: number;
  destroyCallback: () => void;
};

const Mineral = ({ color, size, destroyCallback }: MineralProps) => {
  const [colors, setColors] = useState<string[]>([]);
  const [destroyInfo, setDestroyInfo] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);

  useEffect(() => {
    if (destroyInfo.length === size * size) {
      setTimeout(() => {
        destroyCallback();
      }, 1000);
    }
  }, [destroyInfo, destroyCallback, size]);

  useEffect(() => {
    setDestroyInfo([]);
    setColors(
      Array.from({ length: 10 }).map((_, index) =>
        index < 4
          ? chroma(color)
              .darken(index / 10)
              .hex()
          : chroma(color)
              .brighten((index - 5) / 10)
              .hex(),
      ),
    );
  }, [color]);

  return (
    <div style={{ backgroundColor: color }}>
      {Array.from({ length: size }).map((_, row) => (
        <div key={row} className="flex">
          {Array.from({ length: size }).map((_, col) => (
            <div
              key={col}
              className="relative"
              onClick={() => {
                if (
                  destroyInfo.every((info) => info.x !== col || info.y !== row)
                ) {
                  setDestroyInfo([...destroyInfo, { x: col, y: row }]);
                }
              }}
            >
              <MineralPart
                key={col}
                color={colors[(row + col * 13) % 10]}
                isDestroyed={destroyInfo.some(
                  (info) => info.x === col && info.y === row,
                )}
              />
              <MineralPartPop
                color={colors[(row + col * 13) % 10]}
                isDestroyed={destroyInfo.some(
                  (info) => info.x === col && info.y === row,
                )}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MineralPart = ({
  color,
  isDestroyed,
}: {
  color: string;
  isDestroyed: boolean;
}) => {
  return (
    <div
      className="h-10 w-10"
      style={{ backgroundColor: isDestroyed ? 'black' : color }}
    ></div>
  );
};

const MineralPartPop = ({
  color,
  isDestroyed,
}: {
  color: string;
  isDestroyed: boolean;
}) => {
  return (
    <div className="absolute left-0 top-0 z-20 h-10 w-10">
      <Pops
        isActive={isDestroyed}
        count={15}
        delay={0}
        pops={[
          <div className="z-20 h-2 w-2" style={{ backgroundColor: color }} />,
        ]}
      />
    </div>
  );
};

export default Mineral;

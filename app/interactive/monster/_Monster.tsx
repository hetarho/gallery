import MouseAvoider from '@/app/components/tsx/MouseAvoider';
import MouseFollower from '@/app/components/tsx/MouseFollower';
import clsx from 'clsx';
import { useMemo } from 'react';

export default function Monster({
  color,
  isDarkMode,
}: {
  color: string;
  isDarkMode: boolean;
}) {
  const eyeBlack = useMemo(() => {
    return (
      <div
        className={clsx('h-4 w-4 rounded-full bg-black transition', {
          'h-6 w-6': isDarkMode,
        })}
      ></div>
    );
  }, [isDarkMode]);

  const monster = useMemo(() => {
    return (
      <div className="flex h-36 w-36 items-center justify-center rounded-full">
        <div
          className={`flex h-48 w-48 flex-col items-center justify-center gap-3 rounded-full`}
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
          }}
        >
          <MouseFollower force={1.6}>
            <div className="flex gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseFollower force={2.8}>{eyeBlack}</MouseFollower>
              </div>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseFollower force={2.8}>{eyeBlack}</MouseFollower>
              </div>
            </div>
          </MouseFollower>
        </div>
      </div>
    );
  }, [color]);

  const monsterWhenLight = useMemo(() => {
    return (
      <MouseAvoider force={1.7} transition="all 0.1s ease-in-out">
        {monster}
      </MouseAvoider>
    );
  }, [color]);

  const monsterWhenDark = useMemo(() => {
    return <MouseFollower force={1.1}>{monster}</MouseFollower>;
  }, [color]);

  return isDarkMode ? monsterWhenDark : monsterWhenLight;
}

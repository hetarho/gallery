import InView from '@/app/_components/react/InView';
import MouseAvoider from '@/app/_components/react/MouseAvoider';
import MouseForward from '@/app/_components/react/MouseForward';
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
      <div className="flex h-28 w-28 items-center justify-center rounded-full">
        <div
          className={`flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-full`}
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
          }}
        >
          <MouseForward force={1.6}>
            <div className="flex gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseForward force={2.8}>{eyeBlack}</MouseForward>
              </div>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseForward force={2.8}>{eyeBlack}</MouseForward>
              </div>
            </div>
          </MouseForward>
        </div>
      </div>
    );
  }, [color]);

  const monsterWhenLight = useMemo(() => {
    return <MouseAvoider force={1.7}>{monster}</MouseAvoider>;
  }, [color]);

  const monsterWhenDark = useMemo(() => {
    return <MouseForward force={1.15}>{monster}</MouseForward>;
  }, [color]);

  return <InView>{isDarkMode ? monsterWhenDark : monsterWhenLight}</InView>;
}

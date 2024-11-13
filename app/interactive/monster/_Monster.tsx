import MouseAvoider from '@/app/components/tsx/Mouse/MouseAvoider';
import MouseFollower from '@/app/components/tsx/Mouse/MouseFollower';
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

  return (
    <MouseAvoider spring={10}>
      <div className="flex h-36 w-36 items-center justify-center rounded-full">
        <div
          className={`flex h-48 w-48 flex-col items-center justify-center gap-3 rounded-full`}
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
          }}
        >
          <MouseFollower>
            <div className="flex gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseFollower spring={1.1}>{eyeBlack}</MouseFollower>
              </div>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <MouseFollower spring={1.1}>{eyeBlack}</MouseFollower>
              </div>
            </div>
          </MouseFollower>
        </div>
      </div>
    </MouseAvoider>
  );
}

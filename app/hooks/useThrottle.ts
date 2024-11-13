import { useRef } from "react";

import { useCallback } from "react";

export function useThrottle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) {
  const lastRun = useRef(0);

  return useCallback(
    (...args: T) => {
      const now = Date.now();

      if (lastRun.current && now - lastRun.current < delay) {
        return;
      }

      lastRun.current = now;
      callback(...args);
    },
    [callback, delay]
  );
}

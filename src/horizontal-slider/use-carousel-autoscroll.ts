import { useEffect, useRef } from 'react';

export const useCarouselAutoScroll = (
  action: () => void,
  translateX: number,
  postDuration?: number,
  isAutoScroll?: boolean
) => {
  const intervalID = useRef<number>();

  useEffect(() => {
    if (isAutoScroll && postDuration && translateX) {
      intervalID.current = window.setInterval(() => {
        action();
      }, postDuration);
      return () => {
        window.clearInterval(intervalID.current);
      };
    }
    return () => ({});
  }, [isAutoScroll, postDuration, translateX]);
};

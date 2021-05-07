import { useEffect, useRef } from 'react';

export const useSliderAutoScroll = (
  action: () => void,
  marginLeft: number,
  flexBasis: number,
  slidesLength: number,
  postDuration?: number,
  isAutoScroll?: boolean
) => {
  const intervalID = useRef<number>();

  useEffect(() => {
    if (isAutoScroll && postDuration && flexBasis) {
      intervalID.current = window.setInterval(() => {
        action();
      }, postDuration);
      return () => {
        window.clearInterval(intervalID.current);
      };
    }
    return () => ({});
  }, [isAutoScroll, postDuration, marginLeft, flexBasis, slidesLength]);
};

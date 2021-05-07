import { useEffect, useState } from 'react';
import { Nullable } from '@tintup/tint-sdk';

export const useContainerSize = (
  ref: React.RefObject<HTMLElement>
): Nullable<{
  width: number;
  height: number;
}> => {
  const [windowSize, setWindowSize] = useState<
    Nullable<{
      width: number;
      height: number;
    }>
  >(null);

  const handleResize = () => {
    if (ref.current) {
      setWindowSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref.current]);

  return windowSize;
};

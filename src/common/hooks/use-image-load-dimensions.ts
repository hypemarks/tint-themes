import { useEffect, useState } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib';

export default (
  ref: React.RefObject<HTMLElement>
): {
  height: Nullable<number>;
  width: Nullable<number>;
} => {
  const [{ width, height }, setSizes] = useState<{
    width: Nullable<number>;
    height: Nullable<number>;
  }>({
    width: null,
    height: null,
  });

  const handleLoadImage = () => {
    if (ref.current) {
      setSizes({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('load', handleLoadImage);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('load', handleLoadImage);
      }
    };
  }, []);

  return { height, width };
};

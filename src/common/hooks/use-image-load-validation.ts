import { useEffect, useState } from 'react';

export default (ref: React.RefObject<HTMLImageElement>): boolean => {
  const [loaded, setLoaded] = useState(false);

  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('load', onImageLoaded);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('load', onImageLoaded);
      }
    };
  }, [ref.current]);

  return loaded;
};

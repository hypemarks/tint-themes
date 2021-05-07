import { useEffect } from 'react';

export default (ref: React.RefObject<HTMLElement>, imageUrl: string): void => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries: readonly IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;
        if (isIntersecting && ref.current && imageUrl) {
          ref.current.setAttribute('src', imageUrl);
          observer.disconnect();
        }
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, imageUrl]);
};

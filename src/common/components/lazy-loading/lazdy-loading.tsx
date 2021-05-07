import React, { FC, useEffect } from 'react';

interface ILazyLoading {
  children: React.ReactNode;
  config?: IIntersectionObserver;
}

interface IIntersectionObserver {
  rootMargin?: string;
  threshold?: number;
}

const defaultConfig = {
  root: null,
  rootMargin: '100px',
  threshold: 1,
};

const imageLoadedClassName = 'loaded';
export type Ref = HTMLImageElement;

const LazyLoading: FC<ILazyLoading> = ({ children, config = defaultConfig }) => {
  useEffect(() => {
    const images = document.querySelectorAll(`img[data-src]`);
    const observer = new IntersectionObserver(onChange, config);
    images.forEach(img => {
      observer.observe(img);
    });

    return () => {
      observer.disconnect();
    };
  });

  const onChange = (changes: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    changes.forEach((change: IntersectionObserverEntry) => {
      if (change.intersectionRatio && change.target instanceof HTMLElement && change.target.dataset.src) {
        loadImage(change.target as HTMLInputElement);
        observer.unobserve(change.target);
      }
    });
  };

  const loadImage = (image: HTMLInputElement) => {
    image.classList.add(imageLoadedClassName);
    if (image.dataset && image.dataset.src) {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    }
  };

  return <div className='lazy-loading'>{children}</div>;
};

export default LazyLoading;

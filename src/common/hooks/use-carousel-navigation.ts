import { useEffect } from 'react';
import { RefObject } from 'react';

interface IUseCarouselNavigation<T> {
  left: { leftNavButton: RefObject<T>; leftHandler?: () => void };
  right: { rightNavButton: RefObject<T>; rightHandler?: () => void };
}

const useCarouselNavigation = ({
  left: { leftNavButton, leftHandler },
  right: { rightNavButton, rightHandler },
}: IUseCarouselNavigation<HTMLButtonElement>): void => {
  useEffect(() => {
    if (leftNavButton.current && rightNavButton.current && leftHandler && rightHandler) {
      leftNavButton.current.addEventListener('click', leftHandler);
      rightNavButton.current.addEventListener('click', rightHandler);
    }

    return () => {
      if (leftNavButton.current && rightNavButton.current && leftHandler && rightHandler) {
        leftNavButton.current.removeEventListener('click', leftHandler);
        rightNavButton.current.removeEventListener('click', rightHandler);
      }
    };
  }, [leftNavButton, rightNavButton]);
};

export default useCarouselNavigation;

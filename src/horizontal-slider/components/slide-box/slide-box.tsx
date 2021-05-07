import React, { FC } from 'react';
import './slide-box.sass';
interface ISlideBoxProps {
  isVerticalOrientation: boolean;
}

const SlideBox: FC<ISlideBoxProps> = ({ children, isVerticalOrientation }) => {
  const styles = isVerticalOrientation ? { height: '50%' } : {};

  return (
    <div className='slider__box' style={styles}>
      {children}
    </div>
  );
};

export default SlideBox;

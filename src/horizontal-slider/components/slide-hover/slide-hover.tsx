import React, { FC, useState } from 'react';
import './slide-hover.sass';

export interface ISliderHoverProps {
  isMobile: boolean;
  background?: string;
}

const SlideHover: FC<ISliderHoverProps> = ({ children, isMobile, background }) => {
  const [mouseOver, setMouseOver] = useState(false);

  const onClick = () => {
    setMouseOver(isMobile && !mouseOver);
  };

  const onMouseOver = () => !isMobile && setMouseOver(true);

  const onMouseOut = () => !isMobile && setMouseOver(false);

  return (
    <div
      className='slide-hover'
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{ opacity: mouseOver ? 1 : 0, background }}>
      {children}
    </div>
  );
};

export default SlideHover;

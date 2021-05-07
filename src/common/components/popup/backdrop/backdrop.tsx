import React, { FC } from 'react';
import './backdrop.sass';
import { globalConfig } from '../../../../common/config/config';

export interface IBackdropProps {
  onClick: () => void;
  lightboxColor?: string;
}

export const Backdrop: FC<IBackdropProps> = ({ onClick, lightboxColor }) => {
  const style = lightboxColor ? { background: lightboxColor } : { background: globalConfig.popup.lightboxColor };

  return <div className='backdrop' style={style} onClick={onClick} data-testid={'backdrop'} />;
};

export default Backdrop;

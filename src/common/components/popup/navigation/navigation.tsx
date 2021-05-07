import React, { FC } from 'react';
import './navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

interface INavigationProps {
  navigationType: 'left' | 'right' | 'close';
  onClick?: () => void;
}

const Navigation: FC<INavigationProps> = ({ navigationType, onClick }) => {
  const icon = () => {
    switch (navigationType) {
      case 'left':
        return faAngleLeft;
      case 'right':
        return faAngleRight;
      case 'close':
        return faTimes;
    }
  };

  return (
    <div
      className={`navigation-button navigation-button--${navigationType}`}
      onClick={onClick}
      role='button'
      tabIndex={0}>
      <FontAwesomeIcon icon={icon()} size={'2x'} color={'white'} />
    </div>
  );
};

export default Navigation;

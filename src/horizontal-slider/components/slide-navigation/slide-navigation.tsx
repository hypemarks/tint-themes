import React, { FC } from 'react';
import Button from '../../../common/components/button/button';
import './slide-navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

interface ISlideNavigationProps {
  onClick: () => void;
  isNext: boolean;
}

export const SlideNavigation: FC<ISlideNavigationProps> = ({ onClick, isNext }) => {
  return (
    <Button
      onClick={onClick}
      className={`slide-navigation ${isNext ? 'slide-navigation__next' : 'slide-navigation__prev'}`}>
      {isNext ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft} />}
    </Button>
  );
};

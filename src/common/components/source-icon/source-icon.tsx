import React, { FC } from 'react';
import { PostType } from '@tintup/tint-sdk/lib/';
import { getIcon } from '../../../utils/post-source';
import './source-icon.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface ISourceIconProps {
  type: PostType;
  size?: SizeProp;
  isNavItem?: boolean;
  color?: string;
}

export const SourceIcon: FC<ISourceIconProps> = ({ type, size = 'lg', isNavItem = false, color }) => {
  const icon = getIcon(type);
  if (icon) {
    return (
      <FontAwesomeIcon icon={icon.component} size={size} color={color ? color : icon.color} className='source-icon' />
    );
  } else {
    switch (type) {
      case 'tiktok':
        return (
          <img
            className={`source-icon ${isNavItem ? `source-icon--nav-item` : `source-icon--image`}`}
            src='https://cdn.hypemarks.com/assets/profile/tiktok.svg'
            alt='tiktok icon'
            data-testid={'source-icon'}
          />
        );
      case 'spark':
        return (
          <img
            className={`source-icon ${isNavItem ? `source-icon--nav-item` : `source-icon--image`}`}
            src='https://cdn.hypemarks.com/assets/profile/spark_white.png'
            alt='spark icon'
            data-testid={'source-icon'}
          />
        );
      case 'hootsuite':
        return (
          <img
            className={`source-icon ${isNavItem ? `source-icon--nav-item` : `source-icon--image`}`}
            src='https://cdn.hypemarks.com/assets/profile/icon_hootsuite.png'
            alt='hootsuite icon'
            data-testid={'source-icon'}
          />
        );

      default:
        return null;
    }
  }
};

export default SourceIcon;

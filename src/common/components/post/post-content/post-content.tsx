import React, { FC, MouseEvent } from 'react';
import PostContentLink from './post-content-link/post-content-link';
import { globalConfig } from '../../../config/config';
import './post-content.sass';

export interface IPostContentProps {
  url: string;
  text: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  isPopup?: boolean;
  productsHeaderTitle?: string;
  popupSize?: string;
  isHeightLimit?: boolean;
}

export const PostContent: FC<IPostContentProps> = ({
  url,
  text,
  onClick,
  fontFamily = globalConfig.fontSecondary,
  fontSize,
  fontColor = globalConfig.fontColorPost,
  isPopup = false,
  popupSize,
  isHeightLimit,
}) => {
  return (
    <div
      className={`post-content ${isPopup ? 'post-content--popup' : ''}`}
      aria-label={text}
      style={{
        maxHeight: isHeightLimit ? (popupSize && popupSize === 'small' ? '100px' : '150px') : undefined,
        height: isHeightLimit ? 'auto' : undefined,
        fontSize: `${fontSize}px`,
        color: fontColor,
        fontFamily: `'${fontFamily}'`,
      }}
      data-testid='post-content'>
      <PostContentLink
        fontColor={fontColor}
        isButton={typeof onClick !== 'undefined'}
        href={url}
        onClick={onClick}
        ariaLabel={text}>
        {text}
      </PostContentLink>
    </div>
  );
};

export default PostContent;

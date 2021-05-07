import React, { FC } from 'react';
import './post-title.sass';
import { IGetStyleProperties } from '../../../../utils/pick-style-properties';

export interface IPostTitleProps {
  title: string;
  style: IGetStyleProperties;
  onClick: () => void;
  lineClamp?: number;
  lineHeight?: number;
}

export const PostTitle: FC<IPostTitleProps> = ({ title, style, lineClamp, onClick, lineHeight }) => {
  return (
    <div className='post-title' data-testid='post-title' onClick={onClick}>
      <h3
        className={`post-title__title ${lineClamp ? 'post-title__title--line-clamp' : ''}`}
        style={{
          color: style.color,
          fontSize: style.fontSize,
          WebkitLineClamp: lineClamp && lineClamp,
          lineHeight,
        }}>
        {title}
      </h3>
    </div>
  );
};

export default PostTitle;

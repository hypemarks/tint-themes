import { Nullable, IAuthor } from '@tintup/tint-sdk/lib/';
import React, { FC } from 'react';
import './post-avatar.sass';
import useSetSourceForAvatar from '../../../hooks/use-set-source-for-avatar';
import { globalConfig } from '../../../../common/config/config';

export interface IPostAvatarProps {
  author: IAuthor;
  backgroundColor?: Nullable<string>;
  textColor?: Nullable<string>;
  imageEffect?: Nullable<string>;
  className?: string;
  isPopup?: boolean;
  isLazyLoading?: boolean;
  isRectangle?: boolean;
}

export const PostAvatar: FC<IPostAvatarProps> = ({
  author,
  backgroundColor,
  textColor,
  imageEffect,
  className = '',
  isPopup = false,
  isLazyLoading = true,
  isRectangle = false,
}) => {
  const source = useSetSourceForAvatar({
    author,
    avatarConfig: {
      backgroundColor,
      textColor,
      imageEffect,
    },
  });

  const onImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = globalConfig.urls.blankAvatarUrl;
  };

  return (
    <a
      className='post-avatar'
      href={author.url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${author.username || author.name} profile image`}>
      {isLazyLoading ? (
        <img
          className={`${className} post-avatar--${!isPopup ? 'circle' : 'popup-circle'} ${isRectangle &&
            'post-avatar--rect'}`}
          data-src={source}
          src={globalConfig.urls.blankAvatarUrl}
          onError={onImageError}
          alt={author.name}
        />
      ) : (
        <img
          className={`${className} post-avatar--${!isPopup ? 'circle' : 'popup-circle'} ${isRectangle &&
            'post-avatar--rect'}`}
          src={source}
          onError={onImageError}
          alt={author.name}
        />
      )}
    </a>
  );
};

export default PostAvatar;

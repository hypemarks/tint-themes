import React, { FC } from 'react';
import './slide-avatar.sass';
import { FileLinkClientService, IAuthor, Nullable } from '@tintup/tint-sdk/lib/';
import Logger from '../../../utils/logger';
import { globalConfig } from '../../../common/config/config';

interface ISlideAvatarProps {
  imageEffect?: Nullable<string>;
  author: Nullable<IAuthor>;
  genericAvatarConfig: {
    backgroundColor?: Nullable<string>;
    textColor?: Nullable<string>;
  };
}

export const SlideAvatar: FC<ISlideAvatarProps> = ({
  imageEffect,
  author,
  genericAvatarConfig: { backgroundColor, textColor },
}) => {
  let transformedImage = '';
  if (author && author.image_url) {
    try {
      const fileLinkClient = new FileLinkClientService({
        url: author.image_url,
        imageEffect: imageEffect,
        noImagesScaling: false,
      });

      transformedImage = fileLinkClient
        .applyEffect()
        .autoImage()
        .toString();
    } catch (error) {
      Logger.warning(error);
      transformedImage = 'wrongpath';
    }
  } else {
    transformedImage =
      author && author.username
        ? `https://asset-cache-3.hypemarks.com/image/unknown/w_30,h_30,co_${encodeURIComponent(
            textColor || globalConfig.genericAvatarTextColor
          )},b_${encodeURIComponent(
            backgroundColor || globalConfig.genericAvatarBackgroundColor
          )},c_fill/${author.username.substring(0, 1)}`
        : 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png';
  }

  return author ? (
    <a
      href={author.url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${author.username || author.name} profile image`}>
      <div
        className='slide-avatar'
        style={{
          backgroundImage: `url('${transformedImage}')`,
        }}></div>
    </a>
  ) : null;
};

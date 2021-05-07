import React, { FC, useRef } from 'react';
import { Nullable, FileLinkClientService } from '@tintup/tint-sdk/lib/';
import PostImageWrapper from './post-image-wrapper/post-image-wrapper';
import { IPostWithCTA } from '../../../../types/Post';
import { globalConfig } from '../../../config/config';
import Logger from '../../../../utils/logger';
import './post-image.sass';
import { ICTAConfig } from '../../call-to-action-group/call-to-action-group';
import { ITaggedProduct } from '../../../../types/Product';

export interface IPostImageProps {
  post: IPostWithCTA;
  onClick?: () => void;
  onCtaClick?: (post: IPostWithCTA) => void;
  displayType?: ImageSizeTypes;
  imageEffect?: Nullable<string>;
  ctaConfig?: ICTAConfig;
  noImages?: boolean;
  noImagesScaling?: boolean;
  products?: ReadonlyArray<ITaggedProduct>;
  isLazyLoading?: boolean;
}

export type ImageSizeTypes = 'normal' | 'cover';

const PostImage: FC<IPostImageProps> = ({
  post,
  displayType,
  imageEffect,
  noImages,
  noImagesScaling,
  onClick,
  products,
  isLazyLoading,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    attributes: { image_url: imageUrl, video_url: videoUrl, type, url, alternative_text: alternativeText },
  } = post;

  let transformedImage = '';
  if (imageUrl) {
    try {
      const fileLinkClient = new FileLinkClientService({
        url: imageUrl,
        imageEffect: imageEffect,
        noImagesScaling,
      });

      transformedImage = !imageUrl.includes('api.tintup.com/v2/posts/images/')
        ? fileLinkClient
            .noMetadata()
            .resize({ width: globalConfig.fileStack.width.mediumMediaQuery })
            .applyEffect()
            .autoImage()
            .compress()
            .toString()
        : imageUrl;
    } catch (error) {
      Logger.warning(error);
      transformedImage = 'wrongpath';
    }
  }

  const renderImage = () => {
    return imageUrl ? (
      <PostImageWrapper
        products={products}
        onClick={onClick}
        displayType={displayType}
        type={type}
        src={transformedImage}
        ref={imageRef}
        isLazyLoading={isLazyLoading}
        alt={alternativeText ? alternativeText : ''}></PostImageWrapper>
    ) : (
      renderSocialIconAsImage()
    );
  };

  const renderSocialIconAsImage = () => {
    return <PostImageWrapper href={url} displayType={displayType} type={type} />;
  };

  const renderMedia = () => {
    return videoUrl && transformedImage ? (
      <PostImageWrapper
        products={products}
        onClick={onClick}
        displayType={displayType}
        type={type}
        ref={imageRef}
        src={transformedImage}
        alt={alternativeText ? alternativeText : ''}>
        <div className='play-button' />
      </PostImageWrapper>
    ) : (
      renderImage()
    );
  };

  return !noImages ? renderMedia() : renderSocialIconAsImage();
};

export default PostImage;

import React, { FC } from 'react';
import { IPostWithCTA } from '../../../types/Post';
import { FileLinkClientService, IShape, Nullable } from '@tintup/tint-sdk/lib/';
import { globalConfig } from '../../../common/config/config';
import Logger from '../../../utils/logger';
import './gem-post.sass';
import SourceIcon from '../../../common/components/source-icon/source-icon';

export interface IGemPostProps {
  post: Nullable<IPostWithCTA>;
  shape?: IShape;
  color: string;
  noImagesScaling?: boolean;
  isHighlight: boolean;
  font?: string;
}

export const GemPost: FC<IGemPostProps> = ({ post, shape, color, noImagesScaling = false, isHighlight, font }) => {
  const renderPost = (post: IPostWithCTA) => {
    const {
      attributes: { image_url: imageUrl, author, type },
    } = post;

    let transformedImage = '';
    if (imageUrl) {
      try {
        const fileLinkClient = new FileLinkClientService({
          url: imageUrl,
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
    return (
      <div
        className={`gem-post gem-post--${shape}`}
        style={{
          backgroundImage: `url('${transformedImage}')`,
          backgroundColor: color,
        }}>
        {isHighlight && (
          <div
            className='gem-post__banner'
            style={{
              backgroundColor: color,
            }}>
            {author && author.name && (
              <a className='gem-post__name' style={{ font: font }}>
                {author.name}
              </a>
            )}
            {type && (
              <div className='gem-post__icon'>
                <SourceIcon type={type} size='lg' />
              </div>
            )}
          </div>
        )}
        {isHighlight && (
          <img
            src={author && author.image_url ? author.image_url : globalConfig.urls.blankAvatarUrl}
            className='gem-post__avatar'
            alt='avatar'
          />
        )}
      </div>
    );
  };

  const renderBlankGem = () => {
    return (
      <div
        className={`gem-post gem-post--${shape}`}
        style={{
          backgroundColor: color,
        }}
      />
    );
  };

  return <>{post ? renderPost(post) : renderBlankGem()}</>;
};

export default GemPost;

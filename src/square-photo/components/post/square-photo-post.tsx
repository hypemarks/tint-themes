import React, { FC } from 'react';
import './square-photo-post.sass';
import CallToActionGroup from '../../../common/components/call-to-action-group/call-to-action-group';
import PostImage from '../../../common/components/post/post-image/post-image';
import PostTitle from '../../../common/components/post/post-title/post-title';
import { IPostWithCTA } from '../../../types/Post';
import PostShare from '../../../common/components/post/post-share/post-share';
import { SquarePhotoLayoutClickTypeEnum, ISquarePhotoPostsConfig, ILineClamp } from '../../square-photo-layout';
import { IGetStyleProperties } from '../../../utils/pick-style-properties';
import PostActions from '../../../common/components/post/post-actions/post-actions';
import { globalConfig } from '../../../common/config/config';
import { IUseStylePickerPostDimensions } from '../../../utils/post-style-picker';

interface ISquarePhotoPostProps {
  post: IPostWithCTA;
  config: ISquarePhotoPostsConfig;
  onClick: (
    type: SquarePhotoLayoutClickTypeEnum,
    post?: IPostWithCTA,
    event?: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  style?: IGetStyleProperties;
  lineClamp?: ILineClamp;
  postDimensions?: IUseStylePickerPostDimensions;
}

const defaultShareIconColor = '#fff';

const SquarePhotoPost: FC<ISquarePhotoPostProps> = ({ post, config, onClick, style, lineClamp, postDimensions }) => {
  const renderHoverOverlay = () => {
    return (
      <>
        <div
          className='square-photo-post__header-cover'
          onClick={e => {
            e.stopPropagation();
            onClick(SquarePhotoLayoutClickTypeEnum.POST_CLICK, post);
          }}
          style={{ backgroundColor: config.colorNameBarButtons as string }}
        />
        <PostTitle
          lineClamp={
            !post.attributes.highlighted ? lineClamp && lineClamp.post : lineClamp && lineClamp.highlightedPost
          }
          title={post.attributes.title || post.attributes.text}
          style={{ ...style }}
          onClick={() => onClick(SquarePhotoLayoutClickTypeEnum.POST_CLICK, post)}
        />
      </>
    );
  };

  return (
    <div
      className='square-photo-post'
      style={{
        ...style,
        height: post.attributes.highlighted
          ? postDimensions && postDimensions.highlightPostWidth
          : postDimensions && postDimensions.postWidth,
        width: post.attributes.highlighted
          ? postDimensions && postDimensions.highlightPostWidth
          : postDimensions && postDimensions.postWidth,
      }}
      tabIndex={0}
      onKeyUp={e => onClick(SquarePhotoLayoutClickTypeEnum.ENTER_KEY, post, e)}>
      <header className='square-photo-post__header'>
        {config.textOnHover && renderHoverOverlay()}
        {config.shareButtons ? (
          <div className='square-photo-post__actions'>
            <div
              className='square-photo-post__actions-post-share'
              style={{ backgroundColor: config.colorNameBarButtons as string }}>
              <PostShare
                id={post.id}
                url={post.attributes.url}
                imageUrl={post.attributes.image_url}
                text={post.attributes.text}
                options={config.shareButtonOptions}
                buttons={config.shareButtons}
                colorNameBarButtons={defaultShareIconColor}
                iconStyle={{
                  fontSize: globalConfig.icons.common.postAction.fontSize,
                  color: globalConfig.icons.common.share.color,
                }}
              />
              {post.attributes.type === 'twitter' && (
                <PostActions
                  externalId={post.attributes.external_id}
                  buttonsColor={globalConfig.icons.common.share.color}
                />
              )}
            </div>
            {config.ctaConfig && (
              <div className='square-photo-post__actions-post-cta'>
                <CallToActionGroup
                  cta={post.cta}
                  ctaConfig={config.ctaConfig}
                  post={post}
                  onCtaClick={post => onClick(SquarePhotoLayoutClickTypeEnum.CTA_CLICK, post)}
                />
              </div>
            )}
          </div>
        ) : null}
      </header>

      <div className='square-photo-post__content'>
        {post.attributes.image_url ? (
          <PostImage
            displayType={'cover'}
            post={post}
            imageEffect={config.imageEffect}
            ctaConfig={config.ctaConfig}
            onClick={() => onClick(SquarePhotoLayoutClickTypeEnum.POST_CLICK)}
            onCtaClick={post => onClick(SquarePhotoLayoutClickTypeEnum.CTA_CLICK, post)}
          />
        ) : (
          <PostTitle
            lineClamp={
              !post.attributes.highlighted && lineClamp ? lineClamp.post : lineClamp && lineClamp.highlightedPost
            }
            title={post.attributes.title || post.attributes.text}
            style={{ ...style }}
            onClick={() => onClick(SquarePhotoLayoutClickTypeEnum.POST_CLICK, post)}
          />
        )}
      </div>
    </div>
  );
};

export default SquarePhotoPost;

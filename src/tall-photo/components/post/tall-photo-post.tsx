import React, { FC } from 'react';
import './tall-photo-post.sass';
import CallToActionGroup from '../../../common/components/call-to-action-group/call-to-action-group';
import PostImage from '../../../common/components/post/post-image/post-image';
import PostTitle from '../../../common/components/post/post-title/post-title';
import { IPostWithCTA } from '../../../types/Post';
import PostShare from '../../../common/components/post/post-share/post-share';
import { IGetStyleProperties } from '../../../utils/pick-style-properties';
import PostActions from '../../../common/components/post/post-actions/post-actions';
import { globalConfig } from '../../../common/config/config';
import { IUseStylePickerPostDimensions } from '../../../utils/post-style-picker';
import { ILineClamp, ITallPhotoPostsConfig, TallPhotoLayoutClickTypeEnum } from '../../tall-photo-layout';
import PostAvatar from '../../../common/components/post/post-avatar/post-avatar';
import PostAuthor from '../../../common/components/post/post-author/post-author';
import SourceIcon from '../../../common/components/source-icon/source-icon';

interface ITallPhotoPostProps {
  post: IPostWithCTA;
  config: ITallPhotoPostsConfig;
  onClick: (
    type: TallPhotoLayoutClickTypeEnum,
    post?: IPostWithCTA,
    event?: React.KeyboardEvent<HTMLDivElement>
  ) => void;
  style?: IGetStyleProperties;
  lineClamp?: ILineClamp;
  postDimensions?: IUseStylePickerPostDimensions;
}

const defaultShareIconColor = '#fff';

const TallPhotoPost: FC<ITallPhotoPostProps> = ({ post, config, onClick, style, lineClamp, postDimensions }) => {
  const renderHoverOverlay = () => {
    return (
      <>
        <div
          className='tall-photo-post__header-cover'
          onClick={e => {
            e.stopPropagation();
            onClick(TallPhotoLayoutClickTypeEnum.POST_CLICK, post);
          }}
          style={{ backgroundColor: config.colorNameBarButtons ? config.colorNameBarButtons : undefined }}>
          {post.attributes.image_url && (
            <>
              {post.attributes.type && (
                <SourceIcon type={post.attributes.type} size='lg' color={globalConfig.genericAvatarTextColor} />
              )}
              {post.attributes.author && config.showAuthor !== 0 ? (
                <div className='tall-photo-post__header-author'>
                  <PostAvatar
                    author={post.attributes.author}
                    backgroundColor={config.avatarBackgroundColor}
                    textColor={config.textColor}
                    isRectangle={true}
                  />
                  <PostAuthor author={post.attributes.author} authorFontColor={config.textColor} />
                </div>
              ) : null}
              <PostTitle
                lineClamp={
                  !post.attributes.highlighted ? lineClamp && lineClamp.post : lineClamp && lineClamp.highlightedPost
                }
                title={post.attributes.title || post.attributes.text}
                style={{ ...style }}
                onClick={() => onClick(TallPhotoLayoutClickTypeEnum.POST_CLICK, post)}
                lineHeight={1.4}
              />
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className='tall-photo-post'
      style={{
        ...style,
        minHeight: post.attributes.image_url ? 'auto' : '120px',
        width: post.attributes.highlighted
          ? postDimensions && postDimensions.highlightPostWidth
          : postDimensions && postDimensions.postWidth,
      }}
      tabIndex={0}
      onKeyUp={e => onClick(TallPhotoLayoutClickTypeEnum.ENTER_KEY, post, e)}>
      <header className='tall-photo-post__header'>
        {renderHoverOverlay()}
        {config.shareButtons !== 0 && (
          <div className='tall-photo-post__actions'>
            <div
              className='tall-photo-post__actions-post-share'
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
              <div className='tall-photo-post__actions-post-cta'>
                <CallToActionGroup
                  cta={post.cta}
                  ctaConfig={config.ctaConfig}
                  post={post}
                  onCtaClick={post => onClick(TallPhotoLayoutClickTypeEnum.CTA_CLICK, post)}
                />
              </div>
            )}
          </div>
        )}
      </header>

      <div className='tall-photo-post__content'>
        {post.attributes.image_url ? (
          <PostImage
            post={post}
            imageEffect={config.imageEffect}
            ctaConfig={config.ctaConfig}
            onClick={() => onClick(TallPhotoLayoutClickTypeEnum.POST_CLICK)}
            onCtaClick={post => onClick(TallPhotoLayoutClickTypeEnum.CTA_CLICK, post)}
          />
        ) : (
          <PostTitle
            lineClamp={
              !post.attributes.highlighted && lineClamp ? lineClamp.post : lineClamp && lineClamp.highlightedPost
            }
            title={post.attributes.title || post.attributes.text}
            style={{ ...style }}
            onClick={() => onClick(TallPhotoLayoutClickTypeEnum.POST_CLICK, post)}
          />
        )}
      </div>
    </div>
  );
};

export default TallPhotoPost;

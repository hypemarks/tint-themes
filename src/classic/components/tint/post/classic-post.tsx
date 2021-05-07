import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';
import './classic-post.sass';
import PostTime from '../../../../common/components/post/post-time/post-time';
import PostActions from '../../../../common/components/post/post-actions/post-actions';
import PostAvatar from '../../../../common/components/post/post-avatar/post-avatar';
import PostAuthor from '../../../../common/components/post/post-author/post-author';
import PostShare from '../../../../common/components/post/post-share/post-share';
import { globalConfig } from '../../../../common/config/config';
import { IPostWithCTA } from '../../../../types/Post';
import CallToActionGroup, { ICTAConfig } from '../../../../common/components/call-to-action-group/call-to-action-group';
import { IGetStyleProperties } from '../../../../utils/pick-style-properties';
import { IUseStylePickerPostDimensions } from '../../../../utils/post-style-picker';
import PostImage from '../../../../common/components/post/post-image/post-image';
import PostContent from '../../../../common/components/post/post-content/post-content';

export interface IClassicPostConfig {
  columns?: number;
  postPadding?: string;
  postWidth?: string;
  ctaConfig?: ICTAConfig;
  noPopup?: boolean;
  fontColor?: Nullable<string>;
  fontFamily?: string;
  fontSize?: number;
  timeLanguage?: Nullable<string>;
  showAuthor?: number;
  backgroundColor?: Nullable<string>;
  textColor?: Nullable<string>;
  imageEffect?: Nullable<string>;
  shareButtons?: number;
  shareButtonOptions?: string[];
  noImages?: boolean;
  noImagesScaling?: boolean;

  isPopupLoaded?: boolean;
  themeLayout?: Nullable<string>;
  postBackgroundColor?: Nullable<string>;
  postDuration?: number;
  colorNameBarButtons: string;
}

export interface IClassicPostProps {
  post: IPostWithCTA;
  config: IClassicPostConfig;
  onClickPost?: (post: IPostWithCTA) => void;
  onCtaClick?: (post: IPostWithCTA) => void;
  onEnterKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  style?: IGetStyleProperties;
  postDimensions?: IUseStylePickerPostDimensions;
  isLazyLoading?: boolean;
}

export const ClassicPost: FC<IClassicPostProps> = ({
  post,
  config,
  onClickPost,
  onCtaClick,
  onEnterKeyUp,
  style,
  postDimensions,
  isLazyLoading = true,
}) => {
  const {
    noPopup,
    fontColor,
    fontFamily,
    fontSize,
    timeLanguage,
    colorNameBarButtons,
    showAuthor,
    backgroundColor,
    textColor,
    imageEffect,
    shareButtons,
    shareButtonOptions,
    ctaConfig,
    noImages,
    noImagesScaling,
  } = config;

  const {
    attributes: { type, external_id: externalId, url, text, title, image_url: imageUrl },
    id,
  } = post;

  const shouldOpenPopup = !noPopup;

  const clickPost = () => (shouldOpenPopup && onClickPost ? onClickPost(post) : undefined);

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (shouldOpenPopup) {
      onEnterKeyUp && onEnterKeyUp(event, post);
    }
  };

  const renderPost = (post: IPostWithCTA) => (
    <>
      <PostImage
        post={post}
        onClick={clickPost}
        onCtaClick={onCtaClick}
        noImages={noImages}
        noImagesScaling={noImagesScaling}
        imageEffect={imageEffect}
        ctaConfig={ctaConfig}
        isLazyLoading={isLazyLoading}
      />
      {config.ctaConfig && (
        <CallToActionGroup ctaConfig={config.ctaConfig} post={post} onCtaClick={onCtaClick} cta={post.cta} />
      )}
      <div className='classic-post__content-wrapper'>
        <PostContent
          url={url}
          text={globalConfig.postTypesWithTitle.includes(type) ? title : text}
          onClick={clickPost}
          fontColor={fontColor ? fontColor : undefined}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
        {config.shareButtons ? (
          <div className='classic-post__time-actions-wrapper'>
            <PostTime
              publishedAt={post.attributes.published_at}
              url={post.attributes.url}
              colorNameBarButtons={colorNameBarButtons}
              timeLanguage={timeLanguage}
            />
            {type === 'twitter' && <PostActions externalId={externalId} buttonsColor={colorNameBarButtons} />}
          </div>
        ) : null}
        <div className='classic-post__footer'>
          {post.attributes.author && showAuthor !== 0 ? (
            <>
              <PostAvatar
                author={post.attributes.author}
                backgroundColor={backgroundColor}
                textColor={textColor}
                imageEffect={imageEffect}
              />
              <PostAuthor author={post.attributes.author} />
            </>
          ) : null}
          <PostShare
            id={id}
            url={url}
            imageUrl={imageUrl}
            text={text}
            options={shareButtonOptions}
            buttons={shareButtons}
            colorNameBarButtons={colorNameBarButtons}
          />
        </div>
      </div>
    </>
  );

  return (
    <div
      className='classic-post'
      tabIndex={0}
      onKeyUp={handleEnterKey}
      style={{
        ...style,
        width: post.attributes.highlighted
          ? postDimensions && postDimensions.highlightPostWidth
          : postDimensions && postDimensions.postWidth,
      }}>
      {renderPost(post)}
    </div>
  );
};

export default ClassicPost;

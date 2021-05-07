import React, { FC, MouseEvent } from 'react';
import { IPostWithCTA } from '../../../types/Post';
import CallToActionGroup from '../../../common/components/call-to-action-group/call-to-action-group';
import './slide-content.sass';
import SourceIcon from '../../../common/components/source-icon/source-icon';
import PostTime from '../../../common/components/post/post-time/post-time';
import PostAuthor from '../../../common/components/post/post-author/post-author';
import { ISlidePostConfig } from '../../horizontal-slider-layout';
import PostContent from '../../../common/components/post/post-content/post-content';
import { globalConfig } from '../../../common/config/config';
import { SlideAvatar } from '../slide-avatar/slide-avatar';

export interface ISliderContentProps {
  post: IPostWithCTA;
  config: ISlidePostConfig;
  onClick: (post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  activeCTAIndex: number;
  prevCta: (event: MouseEvent<HTMLElement>) => void;
  nextCta: (event: MouseEvent<HTMLElement>) => void;
  tabIndex: number;
  shouldDisplayCta?: boolean;
}

export const SlideContent: FC<ISliderContentProps> = ({
  post,
  config,
  onClick,
  onCtaClick,
  activeCTAIndex,
  prevCta,
  nextCta,
  tabIndex,
  shouldDisplayCta = true,
}) => {
  const {
    showAuthor,
    backgroundColor,
    textColor,
    imageEffect,
    fontColor,
    fontFamily,
    fontSize,
    timeLanguage,
    colorNameBarButtons,
  } = config;

  const onContentClick = () => onClick && onClick(post);

  const {
    attributes: { type, url, text, title },
  } = post;

  return (
    <div className='slide-content'>
      <div className='slide-content__header'>
        {post.attributes.author && showAuthor ? (
          <>
            <SlideAvatar
              imageEffect={imageEffect}
              author={post.attributes.author}
              genericAvatarConfig={{
                backgroundColor,
                textColor,
              }}
            />
            <PostAuthor author={post.attributes.author} />
          </>
        ) : null}
      </div>
      <div className='slide-content__text' onClick={onContentClick}>
        <PostContent
          url={url}
          text={globalConfig.postTypesWithTitle.includes(type) ? title : text}
          onClick={onContentClick}
          fontColor={fontColor ? fontColor : undefined}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
      </div>
      {shouldDisplayCta && (
        <div className='slide-content__cta-wrapper'>
          <CallToActionGroup
            ctaConfig={config.ctaConfig}
            post={post}
            onCtaClick={onCtaClick}
            cta={[post.cta[activeCTAIndex]]}
            prevCta={prevCta}
            nextCta={nextCta}
            isInSliderTheme={true}
            tabIndex={tabIndex}
          />
        </div>
      )}
      <div className='slide-content__footer'>
        <PostTime
          publishedAt={post.attributes.published_at}
          url={post.attributes.url}
          colorNameBarButtons={colorNameBarButtons}
          timeLanguage={timeLanguage}
          tabIndex={tabIndex}
        />
        <span className='slide-content__footer-icon'>
          <SourceIcon type={post.attributes.type} />
        </span>
      </div>
    </div>
  );
};

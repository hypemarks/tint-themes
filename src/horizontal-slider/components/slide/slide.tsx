import React, { FC, useState, useEffect, MouseEvent } from 'react';
import './slide.sass';
import SlideBox from '../slide-box/slide-box';
import { IPostWithCTA } from '../../../types/Post';
import SlideImage from '../slide-image/slide-image';
import { SlideContent } from '../slide-content/slide-content';
import { ThemeLayoutOptions, globalConfig } from '../../../common/config/config';
import SlideHover from '../slide-hover/slide-hover';
import { ISlidePostConfig } from '../../horizontal-slider-layout';
import useMediaQuery from '../../../common/hooks/use-media-query';

export interface ISlideProps {
  flexBasis: number;
  post: IPostWithCTA;
  config: ISlidePostConfig;
  onSlideContentClick: (post: IPostWithCTA) => void;
  onImagaClick: (post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  id: string;
  tabIndex: number;
}

const isMobile = globalConfig.regExp.mobile.test(navigator.userAgent);
const initialCtaIndex = 0;

const Slide: FC<ISlideProps> = ({
  flexBasis,
  post,
  config,
  onImagaClick,
  onSlideContentClick,
  onCtaClick,
  openPostOnEnter,
  id,
  tabIndex,
}) => {
  const smallMediaQuery = useMediaQuery('(max-width: 480px)');

  const isVerticalOrientation =
    config.themeLayout !== '' && config.themeLayout === ThemeLayoutOptions.TEXT && smallMediaQuery;

  const background = config.postBackgroundColor ? config.postBackgroundColor : '';

  const padding = config.postPadding && !isNaN(Number(config.postPadding)) ? Number(config.postPadding) / 2 : undefined;

  const [activeCTAIndex, setActiveCTAIndex] = useState(0);

  useEffect(() => {
    setActiveCTAIndex(initialCtaIndex);
  }, [post.id]);

  const prevCta = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActiveCTAIndex(prev => (prev === 0 ? post.cta.length - 1 : prev - 1));
  };
  const nextCta = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActiveCTAIndex(prev => (prev === post.cta.length - 1 ? 0 : prev + 1));
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    openPostOnEnter && openPostOnEnter(event, post);
  };

  const renderSlideImage = (urlImage: string) => {
    return (
      <SlideBox isVerticalOrientation={isVerticalOrientation}>
        <SlideImage
          onClick={onImagaClick}
          post={post}
          config={{
            url: urlImage,
            imageEffect: config.imageEffect,
            noImagesScaling: config.noImagesScaling,
          }}
          ctaConfig={config.ctaConfig}
          shouldDisplayCta={config.themeLayout !== ThemeLayoutOptions.TEXT_ON_HOVER}
          onCtaClick={onCtaClick}
          activeCTAIndex={activeCTAIndex}
          prevCta={prevCta}
          nextCta={nextCta}
          tabIndex={tabIndex}
        />
      </SlideBox>
    );
  };

  const renderSlideContent = () => {
    return (
      <SlideBox isVerticalOrientation={isVerticalOrientation}>
        <SlideContent
          post={post}
          config={config}
          onClick={onSlideContentClick}
          shouldDisplayCta={config.themeLayout === ThemeLayoutOptions.TEXT_ON_HOVER}
          onCtaClick={onCtaClick}
          activeCTAIndex={activeCTAIndex}
          prevCta={prevCta}
          nextCta={nextCta}
          tabIndex={tabIndex}
        />
      </SlideBox>
    );
  };

  const renderSliderLayoutImageAndText = () => {
    return post.attributes.image_url ? (
      <>
        {renderSlideImage(post.attributes.image_url)}
        {renderSlideContent()}
      </>
    ) : (
      <>{renderSlideContent()}</>
    );
  };

  const renderSliderLayoutImageWithTextOnHover = () => {
    return (
      <>
        {renderSliderLayoutOnlyImage()}
        <SlideHover isMobile={isMobile} background={background}>
          {renderSlideContent()}
        </SlideHover>
      </>
    );
  };

  const renderSliderLayoutOnlyImage = () => {
    return post.attributes.image_url ? (
      <> {renderSlideImage(post.attributes.image_url)} </>
    ) : (
      <>{renderSlideContent()} </>
    );
  };

  const renderSlideComponents = () => {
    switch (config.themeLayout) {
      case ThemeLayoutOptions.TEXT:
        return renderSliderLayoutImageAndText();
      case ThemeLayoutOptions.TEXT_ON_HOVER:
        return renderSliderLayoutImageWithTextOnHover();
      case ThemeLayoutOptions.IMAGE:
        return renderSliderLayoutOnlyImage();
      default:
        return null;
    }
  };

  return (
    <div
      className='slide-container'
      id={id}
      style={{
        flex: `0 0 ${flexBasis}vw`,
        padding,
        maxWidth: `${flexBasis}vw`,
      }}
      tabIndex={tabIndex}
      onKeyUp={handleEnterKey}>
      <div
        className='slide-container__slide'
        style={{ background, ...(isVerticalOrientation ? { flexWrap: 'wrap' } : { flexWrap: 'nowrap' }) }}>
        {renderSlideComponents()}
      </div>
    </div>
  );
};

export default Slide;

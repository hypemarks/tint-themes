import React, { FC, useRef } from 'react';
import './carousel.sass';
import { SlideNavigation } from './components/slide-navigation/slide-navigation';
import Slide from './components/slide/slide';
import { useCarouselState } from './use-carousel-state';
import { useCarouselAutoScroll } from './use-carousel-autoscroll';
import { IPostWithCTA } from '../types/Post';
import { ISlidePostConfig } from './horizontal-slider-layout';
import { fullWidthFlexBasis } from './consts';
import { globalConfig } from '../common/config/config';
import useListenKeys from '../common/hooks/use-listen-keys';
interface ICarouselProps {
  posts: readonly IPostWithCTA[];
  config: ISlidePostConfig;
  openPopup: (post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  isAutoScroll?: boolean;
}

export const Carousel: FC<ICarouselProps> = ({
  posts,
  config,
  openPopup,
  onCtaClick,
  openPostOnEnter,
  isAutoScroll,
}) => {
  const slideshowRef = useRef<HTMLDivElement>(null);

  const postWidth =
    config.postWidth && !isNaN(Number(config.postWidth)) ? Number(config.postWidth) : Number(globalConfig.postWidth);

  const padding =
    config.postPadding && !isNaN(Number(config.postPadding))
      ? Number(config.postPadding)
      : Number(globalConfig.postPadding);

  const totalPostWidth = postWidth + padding;

  const {
    translateX,
    setTranslateX,
    marginLeft,
    flexBasis,
    containerSize,
    slides,
    slidesOnTheScreen,
  } = useCarouselState(posts, slideshowRef, totalPostWidth);

  const next = () => {
    setTranslateX(prev => prev + 1);
  };
  const prev = () => {
    setTranslateX(prev => prev - 1);
  };

  useListenKeys(
    [
      {
        keyName: 'ArrowRight',
        keyAction: () => next(),
      },
      {
        keyName: 'ArrowLeft',
        keyAction: () => prev(),
      },
    ],
    false
  );

  useCarouselAutoScroll(next, translateX, config.postDuration, isAutoScroll);

  const transX = containerSize
    ? translateX * (containerSize.width / Math.round(fullWidthFlexBasis / flexBasis)) * -1
    : 0;

  const isReadyToDisplay = containerSize && slides.length !== 0 && flexBasis !== 0;

  const isInEditor = window.location != window.parent.location && document.referrer.includes('tintup');

  return (
    <div className='carousel-wrapper' ref={slideshowRef}>
      <>
        <SlideNavigation onClick={prev} isNext={false} />
        <SlideNavigation onClick={next} isNext={true} />
      </>
      {isReadyToDisplay ? (
        <div
          className={`carousel ${isInEditor ? 'carousel--inside-editor' : ''}`}
          style={{
            transform: `translateX(${transX}px)`,
            marginLeft: `${marginLeft}px`,
          }}>
          {slides.map((slide, index) => {
            return (
              <Slide
                id={`ID:${slide.sliderID}${index}`}
                key={`ID:${slide.sliderID}`}
                flexBasis={flexBasis}
                post={slide}
                config={config}
                onSlideContentClick={openPopup}
                onImagaClick={openPopup}
                onCtaClick={onCtaClick}
                openPostOnEnter={openPostOnEnter}
                tabIndex={index < posts.length + slidesOnTheScreen && posts.length <= index ? 0 : -1}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

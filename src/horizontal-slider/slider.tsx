import React, { FC, useRef } from 'react';
import './slider.sass';
import { IPostWithCTA } from '../types/Post';
import { ISlidePostConfig } from './horizontal-slider-layout';
import { SlideNavigation } from './components/slide-navigation/slide-navigation';
import Slide from './components/slide/slide';
import { useSliderState } from './use-slider-state';
import { useSliderAutoScroll } from './use-slider-autoscroll';
import { globalConfig } from '../common/config/config';
import useListenKeys from '../common/hooks/use-listen-keys';
interface ISliderLayoutProps {
  posts: readonly IPostWithCTA[];
  config: ISlidePostConfig;
  openPopup: (post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  fetchNextPage: (isPagination: boolean) => void;
  isAutoScroll?: boolean;
}

export const Slider: FC<ISliderLayoutProps> = ({
  posts,
  config,
  openPopup,
  onCtaClick,
  openPostOnEnter,
  fetchNextPage,
  isAutoScroll,
}) => {
  const slideshowRef = useRef<HTMLDivElement>(null);

  const postWidth =
    config.postWidth && !isNaN(Number(config.postWidth)) ? Number(config.postWidth) : Number(globalConfig.postWidth);

  const padding =
    config.postPadding && !isNaN(Number(config.postPadding))
      ? Number(config.postPadding) / 2
      : Number(globalConfig.postPadding);

  const totalPostWidth = postWidth + padding;

  const {
    prev,
    next,
    isLeftDirectionDisabled,
    isRightDirectionDisabled,
    marginLeft,
    flexBasis,
    containerSize,
    slides,
    activeLastSlide,
    slideWidth,
  } = useSliderState(posts, fetchNextPage, slideshowRef, totalPostWidth);

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

  useSliderAutoScroll(next, marginLeft, flexBasis, slides.length, config.postDuration, isAutoScroll);

  const isReadyToDisplay = containerSize && slides.length !== 0 && flexBasis !== 0;
  const isInEditor = window.location != window.parent.location && document.referrer.includes('tintup');

  return (
    <div className='slider-wrapper' ref={slideshowRef}>
      {!isLeftDirectionDisabled && <SlideNavigation onClick={prev} isNext={false} />}
      {!isRightDirectionDisabled && <SlideNavigation onClick={next} isNext={true} />}
      {isReadyToDisplay ? (
        <div
          className={`slider ${isInEditor ? 'slider--inside-editor' : ''}`}
          style={{
            marginLeft: `${marginLeft}px`,
          }}>
          {slides.map((slide, index) => {
            return (
              <Slide
                id={`${index}`}
                key={index}
                flexBasis={flexBasis}
                post={slide}
                config={config}
                onSlideContentClick={openPopup}
                onImagaClick={openPopup}
                onCtaClick={onCtaClick}
                openPostOnEnter={openPostOnEnter}
                tabIndex={index <= activeLastSlide && index >= (marginLeft / slideWidth) * -1 ? 0 : -1}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

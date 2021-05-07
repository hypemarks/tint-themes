import React, { FC } from 'react';
import { IPostWithCTA } from '../types/Post';
import { ICTAConfig } from '../common/components/call-to-action-group/call-to-action-group';
import { Nullable } from '@tintup/tint-sdk/lib';
import { Carousel } from './carousel';
import { Slider } from './slider';

export interface ISlidePostConfig {
  columns?: number;
  postPadding?: string;
  postWidth?: string;
  ctaConfig: ICTAConfig;
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

export interface IHorizontalSliderLayoutProps {
  posts: readonly IPostWithCTA[];
  config: ISlidePostConfig;
  openPopup: (post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  variant: string;
  fetchNextPage: (isPagination: boolean) => void;
  isAutoScroll?: boolean;
}

export interface ISlide extends IPostWithCTA {
  sliderID: string;
}

enum SliderVariants {
  Slider = 'slider',
  Carousel = 'carousel',
}

const HorizontalSliderLayout: FC<IHorizontalSliderLayoutProps> = ({
  posts,
  config,
  openPopup,
  onCtaClick,
  openPostOnEnter,
  isAutoScroll,
  fetchNextPage,
  variant = SliderVariants.Carousel,
}) => {
  return variant === SliderVariants.Carousel ? (
    <Carousel
      posts={posts}
      config={config}
      openPopup={openPopup}
      onCtaClick={onCtaClick}
      openPostOnEnter={openPostOnEnter}
      isAutoScroll={isAutoScroll}
    />
  ) : (
    <Slider
      fetchNextPage={fetchNextPage}
      posts={posts}
      config={config}
      openPopup={openPopup}
      onCtaClick={onCtaClick}
      openPostOnEnter={openPostOnEnter}
      isAutoScroll={isAutoScroll}
    />
  );
};

export default HorizontalSliderLayout;

import { useState, useLayoutEffect } from 'react';
import { useContainerSize } from './hooks/use-container-size';
import { globalConfig } from '../common/config/config';
import { IPostWithCTA } from '../types/Post';
import { ISlide } from './horizontal-slider-layout';
import { usePrevious } from './hooks/use-previous';
import { fullWidthFlexBasis, initialMarginLeft } from './consts';

type ISlideWithoutSliderID = Pick<ISlide, Exclude<keyof ISlide, 'sliderID'>>;

const fourPosts = 4;
const loadPostsOffset = 3;

export const useSliderState = (
  posts: readonly IPostWithCTA[],
  fetchNextPage: (isPagination: boolean) => void,
  slideshowRef: React.RefObject<HTMLDivElement>,
  postWidth: number
) => {
  const [initialPosts] = useState(posts.length);
  const [flexBasis, setFlexBasis] = useState(0);
  const [marginLeft, setMarginLeft] = useState(initialMarginLeft);
  const [slideWidth, setSlideWidth] = useState(0);
  const [activeLastSlide, setActiveLastSlide] = useState(0);
  const prevFlexBasis = usePrevious(flexBasis);
  const [slides, setSlides] = useState<ISlideWithoutSliderID[]>([]);
  const [isLeftDirectionDisabled, setIsLeftDirectionDisabled] = useState(true);
  const [isRightDirectionDisabled, setIsRightDirectionDisabled] = useState(false);
  const [slidesOnTheScreen, setSlidesOnTheScreen] = useState(0);

  const containerSize = useContainerSize(slideshowRef);

  useLayoutEffect(() => {
    if (containerSize) {
      const { width, height } = containerSize;

      const singlePostWidth = postWidth < width ? postWidth : Number(globalConfig.postWidth);

      const possiblePostsToPlace = Math.floor(width / singlePostWidth);

      if (width >= height) {
        setFlexBasis(fullWidthFlexBasis / possiblePostsToPlace);
      } else {
        setFlexBasis(fullWidthFlexBasis / possiblePostsToPlace);
      }
      setSlideWidth(width / possiblePostsToPlace);
      setActiveLastSlide(width / (width / possiblePostsToPlace) - 1);
    }
  }, [containerSize, postWidth]);

  // handle initial amount of slides
  useLayoutEffect(() => {
    setSlidesOnTheScreen(fullWidthFlexBasis / flexBasis);
    if (flexBasis) {
      const initialSlides = posts.map(post => ({
        ...post,
      }));

      setSlides([...initialSlides]);
    }
  }, [flexBasis]);

  // handle load more slides
  useLayoutEffect(() => {
    const slidesAfter = posts.slice(posts.length - initialPosts, posts.length).map(post => ({ ...post }));

    setSlides([...slides.slice(0, posts.length - initialPosts), ...slidesAfter]);
  }, [posts.length]);

  const prev = () => {
    const numberOfSlidesOnTheScreen = fullWidthFlexBasis / flexBasis;
    if (activeLastSlide - numberOfSlidesOnTheScreen > -1) {
      setActiveLastSlide(s => s - 1);
      setMarginLeft(prev => prev + 1 * slideWidth);
      setIsRightDirectionDisabled(false);
    }
  };

  const next = () => {
    if (activeLastSlide < slides.length - 1) {
      setActiveLastSlide(s => s + 1);
      setMarginLeft(prev => prev - 1 * slideWidth);
      setIsLeftDirectionDisabled(false);
    }
  };

  useLayoutEffect(() => {
    const numberOfSlidesOnTheScreen = fullWidthFlexBasis / flexBasis;
    if (activeLastSlide === slides.length - 1) {
      setIsRightDirectionDisabled(true);
      if (slides.length < fourPosts) {
        fetchNextPage(false);
      }
    } else if (activeLastSlide === slides.length - loadPostsOffset && slides.length >= fourPosts) {
      fetchNextPage(false);
    } else if (activeLastSlide - numberOfSlidesOnTheScreen === -1) {
      setIsLeftDirectionDisabled(true);
    }
  }, [activeLastSlide]);

  return {
    marginLeft,
    slideWidth,
    flexBasis,
    slideshowRef,
    containerSize,
    slides,
    prevFlexBasis,
    prev,
    next,
    isLeftDirectionDisabled,
    isRightDirectionDisabled,
    slidesOnTheScreen,
    activeLastSlide,
  };
};

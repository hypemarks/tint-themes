import { useState, useLayoutEffect } from 'react';
import { useContainerSize } from './hooks/use-container-size';
import { globalConfig } from '../common/config/config';
import { IPostWithCTA } from '../types/Post';
import { ISlide } from './horizontal-slider-layout';
import { usePrevious } from './hooks/use-previous';
import {
  fullWidthFlexBasis,
  initialMarginLeft,
  lengthOfClonedInitiallyLoadedPosts,
  indexOfMiddleArray,
} from './consts';

const SLIDES_STATUS = {
  FRONT_PAGE_LOADED_AND_VISIBLE: 'frontPageLoadedAndVisible',
  FRONT_PAGE_LOADED_AND_NOT_VISIBLE: 'frontPageLoadedAndNotVisible',
  INITIALLY_LOADED_AND_NOT_VISIBLE: 'initiallyLoadedAndNotVisible',
  NEW_NEXT: 'newNext',
  NEW_PREVIOUS: 'newPrevious',
};

export const useCarouselState = (
  posts: readonly IPostWithCTA[],
  slideshowRef: React.RefObject<HTMLDivElement>,
  postWidth: number
) => {
  const [translateX, setTranslateX] = useState(posts.length);
  const [flexBasis, setFlexBasis] = useState(0);
  const [marginLeft, setMarginLeft] = useState(initialMarginLeft);
  const prevFlexBasis = usePrevious(flexBasis);
  const prevTranslateX = usePrevious(translateX);
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [slidesOnTheScreen, setSlidesOnTheScreen] = useState(0);

  const containerSize = useContainerSize(slideshowRef);

  useLayoutEffect(() => {
    if (containerSize) {
      const { width, height } = containerSize;

      const singlePostWidth = postWidth < width ? postWidth : Number(globalConfig.postWidth);

      const possiblePostsToPlace = Math.round(width / singlePostWidth);

      if (width >= height) {
        setFlexBasis(fullWidthFlexBasis / possiblePostsToPlace);
      } else {
        setFlexBasis(fullWidthFlexBasis / possiblePostsToPlace);
      }
    }
  }, [containerSize, postWidth]);

  // handle initial amount of slides
  useLayoutEffect(() => {
    if (flexBasis) {
      const slidesOnScreen = Math.round(fullWidthFlexBasis / flexBasis);
      const loadedPostsLength = posts.length;

      const initialSlides: ISlide[] = Array.from({ length: lengthOfClonedInitiallyLoadedPosts }).flatMap((_, i) =>
        i === indexOfMiddleArray
          ? posts.map((post, index) => ({
              ...post,
              sliderID: `${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE}${i}${index}`,
            }))
          : posts.map((post, index) => ({
              ...post,
              sliderID: `${SLIDES_STATUS.INITIALLY_LOADED_AND_NOT_VISIBLE}${i}${index}`,
            }))
      );

      if (loadedPostsLength > slidesOnScreen) {
        const slides = initialSlides.map((slide, index) =>
          index >= indexOfMiddleArray * loadedPostsLength &&
          index < indexOfMiddleArray * loadedPostsLength + slidesOnScreen
            ? slide
            : index >= indexOfMiddleArray * loadedPostsLength + slidesOnScreen &&
              index < indexOfMiddleArray * loadedPostsLength + loadedPostsLength
            ? {
                ...slide,
                sliderID: `${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_NOT_VISIBLE}${index}`,
              }
            : { ...slide, sliderID: `${SLIDES_STATUS.INITIALLY_LOADED_AND_NOT_VISIBLE}${index}` }
        );

        setSlides([...slides]);
      } else if (loadedPostsLength === slidesOnScreen) {
        setSlides([...initialSlides]);
      } else {
        const lengthOfArray =
          slidesOnScreen % loadedPostsLength === 0
            ? slidesOnScreen / loadedPostsLength
            : slidesOnScreen / loadedPostsLength + 1;

        let initiallyVisible: ISlide[] = Array.from({ length: lengthOfArray }).flatMap((_, i) =>
          posts.map((post, index) => ({
            ...post,
            sliderID: `${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE}${i}${index}`,
          }))
        );

        if (initiallyVisible.length > slidesOnScreen) {
          initiallyVisible = initiallyVisible.map((slide, index) =>
            index < slidesOnScreen
              ? slide
              : {
                  ...slide,
                  sliderID: `${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_NOT_VISIBLE}${index}`,
                }
          );
        }

        const beforeInitialSlidesNotVisible = initialSlides.slice(0, loadedPostsLength * indexOfMiddleArray);
        const afterInitialSlidesNotVisible = initialSlides.slice(loadedPostsLength * (indexOfMiddleArray + 1));

        setSlides([...beforeInitialSlidesNotVisible, ...initiallyVisible, ...afterInitialSlidesNotVisible]);
      }
    }
  }, [flexBasis, containerSize, posts.length]);

  //handle PREV NEXT actions
  useLayoutEffect(() => {
    if (flexBasis) {
      const slidesOnScreen = Math.round(fullWidthFlexBasis / flexBasis);
      const widthOfSlide = containerSize ? containerSize.width / slidesOnScreen : 0;
      const loadedPostsLength = posts.length;

      setSlidesOnTheScreen(Math.round(fullWidthFlexBasis / flexBasis));

      if (translateX < prevTranslateX) {
        setMarginLeft(prevMarginLeft => prevMarginLeft - widthOfSlide);
        setSlides(slides => {
          const firstPost = {
            ...slides[posts.length - 1],
            sliderID: `${SLIDES_STATUS.NEW_PREVIOUS}${slides[posts.length - 1].id}${new Date().getTime()}`,
          };

          return [firstPost, ...slides.slice(0, slides.length - 1)];
        });
      } else if (translateX > prevTranslateX) {
        setMarginLeft(prevMarginLeft => prevMarginLeft + widthOfSlide);
        setSlides(slides => {
          const lastPost = {
            ...slides[slides.length - posts.length * 2],
            sliderID: `${SLIDES_STATUS.NEW_NEXT}${slides[slides.length - posts.length * 2].id}${new Date().getTime()}`,
          };

          return [...slides.slice(1, slides.length), lastPost];
        });
      } else if (translateX === 2 * loadedPostsLength) {
        setMarginLeft(initialMarginLeft);
      }
    }
  }, [flexBasis, translateX]);

  return {
    translateX,
    setTranslateX,
    marginLeft,
    flexBasis,
    slideshowRef,
    containerSize,
    slides,
    prevFlexBasis,
    slidesOnTheScreen,
  };
};

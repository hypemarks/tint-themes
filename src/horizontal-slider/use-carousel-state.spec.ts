import React from 'react';
import { renderHook, act, RenderResult } from '@testing-library/react-hooks';
import { useCarouselState } from './use-carousel-state';
import { buildPosts } from '../../test/generate';
import { IPostWithCTA } from '../types/Post';
import { Nullable } from '@tintup/tint-sdk/lib/';
import { ISlide } from './horizontal-slider-layout';

const SLIDES_STATUS = {
  FRONT_PAGE_LOADED_AND_VISIBLE: 'frontPageLoadedAndVisible',
  FRONT_PAGE_LOADED_AND_NOT_VISIBLE: 'frontPageLoadedAndNotVisible',
  INITIALLY_LOADED_AND_NOT_VISIBLE: 'initiallyLoadedAndNotVisible',
};

const NEW_SLIDES_IDS = {
  NEW_NEXT: 'newNext',
  NEW_PREVIOUS: 'newPrevious',
};

const POST_WIDTH = 750;
const INITIAL_CLIENT_WIDTH = 1500;
const INITIAL_CLIENT_HEIGHT = 1000;
const RESIZED_CLIENT_WIDTH = 2500;
const RESIZED_CLIENT_HEIGHT = 1200;
const TOTAL_NUMBER_OF_SLIDES = 6;
const lengthOfClonedInitiallyLoadedPosts = 3;

describe('useCarouselState hook, loaded with data-count=2', () => {
  const posts = buildPosts([
    {
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
    },
    {
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
      id: '456',
    },
  ]);

  let resultOfTheHook: RenderResult<{
    translateX: number;
    setTranslateX: React.Dispatch<React.SetStateAction<number>>;
    marginLeft: number;
    flexBasis: number;
    slideshowRef: React.RefObject<HTMLDivElement>;
    containerSize: Nullable<{ width: number; height: number }>;
    slides: ISlide[];
    prevFlexBasis: number;
  }>;

  beforeEach(() => {
    const { result } = renderHook(
      ({
        posts,
        postWidth,
        slideshowRef,
      }: {
        posts: IPostWithCTA[];
        postWidth: number;
        slideshowRef: React.RefObject<HTMLDivElement>;
      }) => useCarouselState(posts, slideshowRef, postWidth),
      {
        initialProps: {
          posts,
          postWidth: POST_WIDTH,
          slideshowRef: {
            current: { clientHeight: INITIAL_CLIENT_HEIGHT, clientWidth: INITIAL_CLIENT_WIDTH },
          } as React.RefObject<HTMLDivElement>,
        },
      }
    );
    resultOfTheHook = result;
  });

  it('should render initial state', () => {
    const initialMarginLeft = 0;
    const initialFlexBasis = 50;
    const initialPrevFlexBasis = 50;
    const initialTranslateX = posts.length;
    const numberOfNotVisible = posts.length * lengthOfClonedInitiallyLoadedPosts - posts.length;

    const { current: returnedValueOfHook } = resultOfTheHook;

    expect(returnedValueOfHook.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(returnedValueOfHook.translateX).toBe(initialTranslateX);
    expect(returnedValueOfHook.marginLeft).toBe(initialMarginLeft);
    expect(returnedValueOfHook.prevFlexBasis).toBe(initialPrevFlexBasis);
    expect(returnedValueOfHook.flexBasis).toBe(initialFlexBasis);
    expect(returnedValueOfHook.containerSize!.width).toBe(INITIAL_CLIENT_WIDTH);
    expect(returnedValueOfHook.containerSize!.height).toBe(INITIAL_CLIENT_HEIGHT);

    const bluePrintVisibleIndexes = [2, 3];
    const visibleIndexes: number[] = [];
    const initiallyVisible = returnedValueOfHook.slides.filter((post, i) => {
      const result = post.sliderID.includes(SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE);
      if (result) {
        visibleIndexes.push(i);
      }

      return result;
    });
    expect(initiallyVisible.length).toBe(TOTAL_NUMBER_OF_SLIDES - numberOfNotVisible);

    visibleIndexes.forEach((e, i) => expect(e).toBe(bluePrintVisibleIndexes[i]));

    const initiallyNotVisible = returnedValueOfHook.slides.filter(post =>
      post.sliderID.includes(SLIDES_STATUS.INITIALLY_LOADED_AND_NOT_VISIBLE)
    );
    expect(initiallyNotVisible.length).toBe(TOTAL_NUMBER_OF_SLIDES - posts.length);
  });

  it('should scroll left direction PREV', () => {
    const digit = '\\d+';
    const regExpNewPrevious = new RegExp(`${NEW_SLIDES_IDS.NEW_PREVIOUS}${digit}`);
    // 1 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 2 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 3 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 4 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 5 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 6 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));

    // 7 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));
    // 8 PREV
    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[0].sliderID).toEqual(expect.stringMatching(regExpNewPrevious));
  });

  it('should scroll right direction NEXT', () => {
    const digit = '\\d+';
    const regExpNewPrevious = new RegExp(`${NEW_SLIDES_IDS.NEW_NEXT}${digit}`);

    // 1 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 2 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 3 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 4 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 5 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 6 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 7 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );

    // 8 NEXT
    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);
    expect(resultOfTheHook.current.slides[resultOfTheHook.current.slides.length - 1].sliderID).toEqual(
      expect.stringMatching(regExpNewPrevious)
    );
  });

  it('should load hidden slides to the left ', () => {
    const firstSlidesIndex = 0;
    const noOfNotVisible = posts.length * lengthOfClonedInitiallyLoadedPosts - posts.length;
    const { current: returnedValueOfHook } = resultOfTheHook;

    const firstVibileSlideIndex = returnedValueOfHook.slides.findIndex(slide =>
      slide.sliderID.includes(SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE)
    );
    const notVisibleSlidesToTheLeft = returnedValueOfHook.slides.slice(firstSlidesIndex, firstVibileSlideIndex);

    expect(notVisibleSlidesToTheLeft.length).toBe(noOfNotVisible / 2);
  });

  it('should load hidden slides to the right', () => {
    const noOfNotVisible = posts.length * lengthOfClonedInitiallyLoadedPosts - posts.length;

    const { current: returnedValueOfHook } = resultOfTheHook;

    const firstVibileSlideIndex = returnedValueOfHook.slides.findIndex(slide =>
      slide.sliderID.includes(SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE)
    );
    const notVisibleSlidesToTheRight = returnedValueOfHook.slides.slice(
      firstVibileSlideIndex + 2,
      returnedValueOfHook.slides.length
    );

    expect(notVisibleSlidesToTheRight.length).toBe(noOfNotVisible / 2);
  });

  it('should always load new slides to left direction and remove last one', () => {
    const tempSlidesWithoutFirstOneBeforePrevAction = resultOfTheHook.current.slides.slice(
      0,
      resultOfTheHook.current.slides.length - 1
    );

    act(() => resultOfTheHook.current.setTranslateX(s => s - 1));

    expect(
      resultOfTheHook.current.slides.find(slide => slide.sliderID.includes(NEW_SLIDES_IDS.NEW_PREVIOUS))
    ).not.toBeNull();
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);

    const tempSlidesWithoutFirstOneAfterPrevAction = resultOfTheHook.current.slides.slice(
      1,
      resultOfTheHook.current.slides.length
    );

    tempSlidesWithoutFirstOneBeforePrevAction.forEach((e, index) =>
      expect(e.sliderID).toBe(tempSlidesWithoutFirstOneAfterPrevAction[index].sliderID)
    );
  });

  it('should always load new slides to right direction and remove first one', () => {
    const tempSlidesWithoutFirstOneBeforeNextAction = resultOfTheHook.current.slides.slice(
      1,
      resultOfTheHook.current.slides.length
    );

    act(() => resultOfTheHook.current.setTranslateX(s => s + 1));

    expect(
      resultOfTheHook.current.slides.find(slide => slide.sliderID.includes(NEW_SLIDES_IDS.NEW_NEXT))
    ).not.toBeNull();
    expect(resultOfTheHook.current.slides.length).toBe(TOTAL_NUMBER_OF_SLIDES);

    const lastSlidesIndex = resultOfTheHook.current.slides.length - 1;
    const firstSlidesIndex = 0;

    const tempSlidesWithoutFirstOneAfterNextAction = resultOfTheHook.current.slides.slice(
      firstSlidesIndex,
      lastSlidesIndex
    );

    tempSlidesWithoutFirstOneBeforeNextAction.forEach((e, index) =>
      expect(e.sliderID).toBe(tempSlidesWithoutFirstOneAfterNextAction[index].sliderID)
    );
  });
});

describe('useCarouselState hook, loaded with data-count=3', () => {
  const posts = buildPosts([
    {
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
    },
    {
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
      id: '456',
    },
    {
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
      id: '789',
    },
  ]);

  it('should resize container and adjust ', () => {
    const { result, rerender, waitFor } = renderHook(
      ({
        posts,
        postWidth,
        slideshowRef,
      }: {
        posts: IPostWithCTA[];
        postWidth: number;
        slideshowRef: React.RefObject<HTMLDivElement>;
      }) => useCarouselState(posts, slideshowRef, postWidth),
      {
        initialProps: {
          posts,
          postWidth: POST_WIDTH,
          slideshowRef: {
            current: { clientHeight: INITIAL_CLIENT_HEIGHT, clientWidth: INITIAL_CLIENT_WIDTH },
          } as React.RefObject<HTMLDivElement>,
        },
      }
    );

    const digit = '\\d+';
    const regExpBefore = new RegExp(`${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_NOT_VISIBLE}${digit}`);
    const regExpAfter = new RegExp(`${SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE}${digit}`);

    expect(result.current.slides[5].sliderID).toEqual(expect.stringMatching(regExpBefore));
    expect(result.current.containerSize!.width).toEqual(INITIAL_CLIENT_WIDTH);

    rerender({
      posts,
      postWidth: POST_WIDTH,
      slideshowRef: {
        current: { clientHeight: RESIZED_CLIENT_HEIGHT, clientWidth: RESIZED_CLIENT_WIDTH },
      } as React.RefObject<HTMLDivElement>,
    });

    waitFor(() => result.current.containerSize!.width === RESIZED_CLIENT_WIDTH).then(() => {
      expect(result.current.slides[5].sliderID).toEqual(expect.stringMatching(regExpAfter));
      expect(result.current.containerSize!.width).toEqual(RESIZED_CLIENT_WIDTH);
    });
  });

  it('should duplicate front page slides if there are less than container size can display', () => {
    const { result } = renderHook(
      ({
        posts,
        postWidth,
        slideshowRef,
      }: {
        posts: IPostWithCTA[];
        postWidth: number;
        slideshowRef: React.RefObject<HTMLDivElement>;
      }) => useCarouselState(posts, slideshowRef, postWidth),
      {
        initialProps: {
          posts,
          postWidth: 199,
          slideshowRef: {
            current: { clientHeight: INITIAL_CLIENT_HEIGHT, clientWidth: INITIAL_CLIENT_WIDTH },
          } as React.RefObject<HTMLDivElement>,
        },
      }
    );

    const { current: returnedValueOfHook } = result;

    const frontPageLoadedAndVisibleSlides = returnedValueOfHook.slides.filter(slide =>
      slide.sliderID.includes(SLIDES_STATUS.FRONT_PAGE_LOADED_AND_VISIBLE)
    );
    const frontPageLoadedAndNotVisibleSlides = returnedValueOfHook.slides.filter(slide =>
      slide.sliderID.includes(SLIDES_STATUS.FRONT_PAGE_LOADED_AND_NOT_VISIBLE)
    );

    expect(frontPageLoadedAndVisibleSlides.length).toBe(8);
    expect(frontPageLoadedAndNotVisibleSlides.length).toBe(1);
  });
});

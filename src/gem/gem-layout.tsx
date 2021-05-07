import React, { FC, useEffect, useRef, useState } from 'react';
import { IPostWithCTA } from '../types/Post';
import GemPost from './components/post/gem-post';
import { IDirection, IShape, IGemAmount, Nullable } from '@tintup/tint-sdk/lib';
import { globalConfig } from '..';
import './gem-layout.sass';
import { debounce } from '../utils/function-utils';

export interface IGemLayoutProps {
  posts: readonly IPostWithCTA[];
  transitionSpeed?: number;
  colors: readonly string[];
  shape: IShape;
  direction: IDirection;
  postPadding?: string;
  postWidth?: string;
  highlightDuration?: string;
  fontFamily: string;
  gemAmount?: IGemAmount;
}

interface IAnimationData {
  x: number;
  y: number;
  transition: number;
  isHighlighted: boolean;
}

export interface IGem {
  id: string;
  animationData: IAnimationData;
  post: Nullable<IPostWithCTA>;
}

export const GemLayout: FC<IGemLayoutProps> = ({
  posts,
  shape,
  colors,
  postPadding = globalConfig.postPadding,
  postWidth = globalConfig.postWidth,
  direction,
  highlightDuration,
  fontFamily,
  gemAmount,
}) => {
  const [columns, setColumns] = useState(0);
  const [animationIteration, setAnimationIteration] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gems, setGems] = useState<IGem[]>([]);
  const timerRef = useRef<number | undefined>();

  useEffect(() => {
    const debouncedOnResize = debounce(onResize, 500);
    window.addEventListener('resize', onResize);
    setColumns(calculateColumns());

    return () => window.removeEventListener('resize', debouncedOnResize);
  }, []);

  useEffect(() => {
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (typeof timerRef !== 'undefined') {
      clearTimeout(timerRef.current);
    }
  }, [columns]);

  const getMargin = () => {
    const half = 2;
    return !isNaN(Number(postPadding) / half) ? Number(postPadding) / half : Number(globalConfig.postPadding) / half;
  };

  useEffect(() => {
    if (columns !== 0 && !isLoaded) {
      const dimension = Math.floor(Number(window.innerWidth / columns));
      setGems(calculateAnimationOffset(fillTheView(posts, dimension), columns));
      setIsLoaded(true);
      if (typeof timerRef !== 'undefined') {
        clearTimeout(timerRef.current);
      }
    }
  }, [posts, columns, isLoaded]);

  useEffect(() => {
    if (isLoaded && !gems.find(animation => animation.animationData.isHighlighted)) {
      timerRef.current = getTimeoutAnimation();
    }
  }, [isLoaded, gems]);

  const calculateColumns = () => {
    const margin = getMargin();
    const singlePostWidth = postWidth ? Number(postWidth) : Number(globalConfig.postWidth);
    return Math.floor(window.innerWidth / (singlePostWidth + margin * 2));
  };

  const onResize = () => {
    setIsLoaded(false);
    setColumns(calculateColumns());
  };

  const lockScroll = () => {
    const body = document.querySelector('body');
    if (body !== null) {
      body.style.overflow = 'hidden';
    }
  };

  const unlockScroll = () => {
    const body = document.querySelector('body');
    if (body !== null) {
      body.style.overflow = 'auto';
    }
  };

  const getTimeoutAnimation = () => {
    return window.setTimeout(() => {
      if (animationIteration < 4) {
        animate();
        highlightDuration && Number(highlightDuration) > 0 && setAnimationIteration(animationIteration + 1);
      } else {
        timerRef.current = animateHighlight();
        setAnimationIteration(0);
      }
    }, 3000);
  };

  const animateHighlight = () => {
    const dimension = Math.floor(Number(window.innerWidth / columns));
    const inView = gems
      .map((gem, i) => ({ ...gem, sourceIndex: i }))
      .filter(gem => {
        return (
          gem.animationData.x > dimension &&
          gem.animationData.x < window.innerWidth - 2 * dimension &&
          gem.animationData.y > dimension &&
          gem.animationData.y < window.innerHeight - 2 * dimension
        );
      })
      .filter(gem => gem.post);
    const randomIndex = inView[Math.floor(Math.random() * Math.floor(inView.length - 1))].sourceIndex;

    const column = gems[randomIndex].animationData.x / dimension;
    const row = gems[randomIndex].animationData.y / dimension;

    const newGemAnimationOffset = gems.map((gem, i) => {
      if (i !== randomIndex && gem.animationData.x / dimension === column) {
        if (gem.animationData.y < gems[randomIndex].animationData.y) {
          return { ...gem, animationData: { ...gem.animationData, y: gem.animationData.y - dimension, transition: 1 } };
        } else {
          return { ...gem, animationData: { ...gem.animationData, y: gem.animationData.y + dimension, transition: 1 } };
        }
      } else if (
        i !== randomIndex &&
        row - gem.animationData.y / dimension >= -1 &&
        row - gem.animationData.y / dimension <= 1
      ) {
        if (gem.animationData.x < gems[randomIndex].animationData.x) {
          return { ...gem, animationData: { ...gem.animationData, x: gem.animationData.x - dimension, transition: 1 } };
        } else {
          return { ...gem, animationData: { ...gem.animationData, x: gem.animationData.x + dimension, transition: 1 } };
        }
      }
      return i === randomIndex
        ? {
            ...gem,
            animationData: { ...gem.animationData, isHighlighted: true, transition: 1 },
          }
        : gem;
    });

    setGems(newGemAnimationOffset);

    return window.setTimeout(() => {
      setGems(
        newGemAnimationOffset.map((gem, i) => {
          if (i !== randomIndex && gem.animationData.x / dimension === column) {
            if (gem.animationData.y < gems[randomIndex].animationData.y) {
              return { ...gem, animationData: { ...gem.animationData, y: gem.animationData.y + dimension } };
            } else {
              return { ...gem, animationData: { ...gem.animationData, y: gem.animationData.y - dimension } };
            }
          } else if (
            i !== randomIndex &&
            row - gem.animationData.y / dimension >= -1 &&
            row - gem.animationData.y / dimension <= 1
          ) {
            if (gem.animationData.x < gems[randomIndex].animationData.x) {
              return { ...gem, animationData: { ...gem.animationData, x: gem.animationData.x + dimension } };
            } else {
              return { ...gem, animationData: { ...gem.animationData, x: gem.animationData.x - dimension } };
            }
          }

          return !gem.animationData.isHighlighted
            ? gem
            : {
                ...gem,
                animationData: { ...gem.animationData, isHighlighted: false, transition: 1 },
              };
        })
      );
    }, Number(highlightDuration));
  };

  const animate = () => {
    const dimension = Math.floor(Number(window.innerWidth / columns));
    if (direction === 'up') {
      const lastElementYOffset = gems.reduce((a, b) => Math.max(a, b.animationData.y), 0);
      const newAnimationOffset = gems.map((gem, i) => {
        if (gem.animationData.y !== -2 * dimension) {
          const rows = Math.floor(window.innerHeight / dimension);

          const transition = (rows + 2 - gem.animationData.y / dimension) / 4 + (i % columns) * 0.11;

          return {
            ...gem,
            animationData: {
              x: gem.animationData.x,
              y: gem.animationData.y - dimension,
              transition,
              isHighlighted: false,
            },
          };
        } else {
          return {
            ...gem,
            animationData: { x: gem.animationData.x, y: lastElementYOffset, transition: 0, isHighlighted: false },
          };
        }
      });

      setGems(newAnimationOffset);
    } else if (direction === 'down') {
      const lastElementYOffset = gems.reduce((a, b) => Math.min(a, b.animationData.y), 0);
      const rows = Math.floor(window.innerHeight / dimension);
      const newAnimationOffset = gems.map((gem, i) => {
        if (gem.animationData.y !== (rows + 2) * dimension) {
          const rows = Math.floor(window.innerHeight / dimension);
          const transition = (rows + 2 + gem.animationData.y / dimension) / 4 + (i % columns) * 0.11;
          return {
            ...gem,
            animationData: {
              x: gem.animationData.x,
              y: gem.animationData.y + dimension,
              transition,
              isHighlighted: false,
            },
          };
        } else {
          return {
            ...gem,
            animationData: { x: gem.animationData.x, y: lastElementYOffset, transition: 0, isHighlighted: false },
          };
        }
      });

      setGems(newAnimationOffset);
    } else if (direction === 'left') {
      const lastElementXOffset = gems.reduce((a, b) => Math.max(a, b.animationData.x), 0);
      const currentColumns = Math.floor(window.innerWidth / dimension);
      const rows = Math.floor(window.innerHeight / dimension);
      const newAnimationOffset = gems.map((gem, i) => {
        if (gem.animationData.x !== -2 * dimension) {
          const transition = Math.abs(gem.animationData.x / dimension - currentColumns - 1) / 2 + (i % rows) * 0.11;
          return {
            ...gem,
            animationData: {
              x: gem.animationData.x - dimension,
              y: gem.animationData.y,
              transition,
              isHighlighted: false,
            },
          };
        } else {
          return {
            ...gem,
            animationData: { x: lastElementXOffset, y: gem.animationData.y, transition: 0, isHighlighted: false },
          };
        }
      });

      setGems(newAnimationOffset);
    } else if (direction === 'right') {
      const lastElementXOffset = gems.reduce((a, b) => Math.min(a, b.animationData.x), 0);
      const currentColumns = Math.floor(window.innerWidth / dimension);
      const rows = Math.floor(window.innerHeight / dimension);
      const newAnimationOffset = gems.map((gem, i) => {
        if (gem.animationData.x !== (currentColumns + 2) * dimension) {
          const transition = Math.abs(gem.animationData.x / dimension + currentColumns + 1) / 2 + (i % rows) * 0.11;
          return {
            ...gem,
            animationData: {
              x: gem.animationData.x + dimension,
              y: gem.animationData.y,
              transition,
              isHighlighted: false,
            },
          };
        } else {
          return {
            ...gem,
            animationData: { x: lastElementXOffset, y: gem.animationData.y, transition: 0, isHighlighted: false },
          };
        }
      });

      setGems(newAnimationOffset);
    }
  };

  const calculateAnimationOffset = (gems: IGem[], columns: number) => {
    const dimension = Math.floor(Number(window.innerWidth / columns));
    const rows = Math.floor(window.innerHeight / dimension);
    if (direction === 'up' || direction === 'down') {
      return gems.map((gem, i) => {
        const xOffset = (i % columns) * dimension;
        const yOffset =
          direction === 'up'
            ? (-2 + Math.floor(i / columns)) * dimension
            : (rows + 2 - Math.floor(i / columns)) * dimension;
        const transition = yOffset < 0 ? 0 : yOffset / dimension;
        return { ...gem, animationData: { x: xOffset, y: yOffset, transition, isHighlighted: false } };
      });
    } else {
      return gems.map((gem, i) => {
        const xOffset =
          direction === 'left'
            ? (-2 + Math.floor(i / (rows + 1))) * dimension
            : (columns + 2 - Math.floor(i / (rows + 1))) * dimension;

        const yOffset = (i % (rows + 1)) * dimension;
        const transition = yOffset < 0 ? 0 : yOffset / dimension;
        return { ...gem, animationData: { x: xOffset, y: yOffset, transition, isHighlighted: false } };
      });
    }
  };

  const mapPostsPosition = (columns: number) => {
    const dimension = Math.floor(Number(window.innerWidth / columns));
    return gems.map((gem, i) => {
      return (
        <div
          key={gem.id + i}
          className='gem-layout__post'
          style={{
            padding: postPadding + 'px',
            transform: `translate(${gem.animationData.x}px, ${gem.animationData.y}px)`,
            width: `${!gem.animationData.isHighlighted ? dimension : 3 * dimension}px`,
            height: `${!gem.animationData.isHighlighted ? dimension : 3 * dimension}px`,
            transitionTimingFunction: 'cubicBezier(0.77, 0, 0.175, 1)',
            transitionDuration: `${gem.animationData.transition}s`,
            marginTop: `${!gem.animationData.isHighlighted ? 0 : -dimension}px`,
            marginLeft: `${!gem.animationData.isHighlighted ? 0 : -dimension}px`,
          }}>
          <GemPost
            post={gem.post}
            shape={shape}
            color={colors[i % colors.length]}
            isHighlight={gem.animationData.isHighlighted}
            font={fontFamily}
          />
        </div>
      );
    });
  };

  const fillTheView = (posts: readonly IPostWithCTA[], dimension: number) => {
    let filledPosts: Nullable<IPostWithCTA>[] = [...posts];
    const rows = Math.floor(window.innerHeight / dimension) + 1;
    const additionalOffscreenRows = 4;
    if (posts.length < columns * (rows + additionalOffscreenRows)) {
      filledPosts = [...new Array(columns * (rows + additionalOffscreenRows))].map((_value, i) => {
        return posts[i % posts.length];
      });
    }

    filledPosts = fillGems(filledPosts);
    const lastPosition =
      direction === 'up' || direction === 'down' ? (filledPosts.length - 1) % columns : (filledPosts.length - 1) % rows;
    const blankOffset = columns - 1 - lastPosition;
    if (blankOffset > 0) {
      filledPosts = [
        ...filledPosts,
        ...posts.slice(Math.floor((posts.length - 1) / 2), Math.floor((posts.length - 1) / 2) + blankOffset),
      ];
    }

    return filledPosts.map(post => {
      return {
        id: post
          ? post.id
          : Math.random()
              .toString(36)
              .substr(2, 9),
        post: post,
        animationData: {
          x: 0,
          y: 0,
          transition: 0,
          isHighlighted: false,
        },
      };
    });
  };

  const fillGems = (posts: Nullable<IPostWithCTA>[]) => {
    let newArray: Nullable<IPostWithCTA>[] = [];

    switch (gemAmount) {
      case 'little': {
        const numberOfBlankGem = Math.floor(posts.length / columns);
        newArray = [...posts];
        for (let i = 0; i < numberOfBlankGem; i++) {
          const randomIndex = Math.random() * (Math.floor(i * columns + columns) - i * columns) + i * columns;
          newArray.splice(randomIndex, 0, null);
        }

        return newArray;
      }
      case 'lots': {
        const numberOfBlankGem = Math.floor(posts.length / columns) * 3;
        newArray = [...posts];
        for (let i = 0; i < numberOfBlankGem; i++) {
          const randomIndex = Math.random() * (Math.floor((i * columns) / 3 + columns / 3) - i * columns) + i * columns;
          newArray.splice(randomIndex, 0, null);
        }
        return newArray;
      }
      default:
        return posts;
    }
  };

  return <div className='gem-layout'>{isLoaded && mapPostsPosition(columns)}</div>;
};

export default GemLayout;

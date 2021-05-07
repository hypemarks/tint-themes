import React, { FC, ReactNodeArray, useEffect, useRef, useState } from 'react';
import './waterfall_layout.sass';
import useWindowSize from '../../hooks/use-window-size';
import { IPostWithCTA } from '../../../types/Post';
import { globalConfig } from '../../../common/config/config';

export interface IWaterfallLayoutProps {
  children: ReactNodeArray;
  posts: readonly IPostWithCTA[];
  postPadding?: string;
  configColumns?: number;
  postWidth?: string;
  transitionSpeed?: number;
}

interface DataChunk {
  posts: readonly IPostWithCTA[];
  isDataFullyFetched: boolean;
}

interface IColumnOffset {
  first: number;
  second: number;
}

export const WaterfallLayout: FC<IWaterfallLayoutProps> = ({
  children,
  posts,
  postPadding,
  configColumns,
  postWidth,
  transitionSpeed = 200000,
}) => {
  const lengthOfPostsChunk = 24;
  const dataChunk: DataChunk = {
    posts: [],
    isDataFullyFetched: false,
  };

  const [currentTranslate, setCurrentTranslate] = useState(0);
  const { width: containerWidth } = useWindowSize();
  const [visiblePosts, setVisiblePosts] = useState<IPostWithCTA[]>([]);
  const [columns, setColumns] = useState(0);
  const [columnOffset, setColumnOffset] = useState<IColumnOffset[]>([]);
  const waterfallRef = useRef<HTMLDivElement>(null);
  const [currentTransitionSpeed, setCurrentTransitionSpeed] = useState(transitionSpeed);

  useEffect(() => {
    if (waterfallRef.current && waterfallRef.current.children.length > 0) {
      const columnMatrix = getColumnMatrixHeight();
      columnOffset.forEach((offset, i) => {
        const height = columnMatrix[i];
        if (currentTranslate > height[0] + offset.first) {
          const newColumn = columnOffset;
          newColumn[i] = { ...newColumn[i], first: height[0] + height[1] + newColumn[i].first };
          setColumnOffset(newColumn);
        } else if (currentTranslate > height[0] + height[1] + offset.second) {
          const newColumn = columnOffset;
          newColumn[i] = { ...newColumn[i], second: height[0] + height[1] + newColumn[i].second };
          setColumnOffset(newColumn);
        }
      });
    }
  }, [currentTranslate, columnOffset, waterfallRef]);

  const getColumnMatrixHeight = () => {
    if (waterfallRef.current) {
      return Array.from(waterfallRef.current.children).map(column => {
        return Array.from(column.children).map(child => {
          return child.clientHeight + getMargin();
        });
      });
    }
    return [];
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

  useEffect(() => {
    window.addEventListener('resize', onResize);
    setVisiblePosts([...getInitialPosts()]);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const initialTimeout = 2000;
    lockScroll();
    setTimeout(() => {
      setCurrentTranslate(currentTranslate + 500);
    }, initialTimeout);
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    setColumnOffset(Array(columns).fill({ first: 0, second: 0 }));
  }, [columns]);

  const onAnimationEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    setCurrentTranslate(currentTranslate + 500);
    event.stopPropagation();
  };

  const getInitialPosts = (): readonly IPostWithCTA[] => {
    let postTempArray: IPostWithCTA[] = [...posts];
    while (lengthOfPostsChunk >= postTempArray.length) {
      postTempArray = [...postTempArray, ...posts];
    }
    setDataChunk([...postTempArray]);
    return postTempArray;
  };

  const getMargin = () => {
    const half = 2;
    return !isNaN(Number(postPadding) / half) ? Number(postPadding) / half : Number(globalConfig.postPadding) / half;
  };

  const getWidth = () => {
    const margin = getMargin();
    if (configColumns !== undefined && !isNaN(configColumns) && configColumns > 0) {
      return Math.floor(containerWidth / columns) - margin * 2;
    }
    const singlePostWidth = postWidth ? Number(postWidth) : Number(globalConfig.postWidth);
    return Math.floor(containerWidth / (singlePostWidth + margin * 2));
  };

  const getColumnsWidth = () => {
    return getWidth();
  };

  const onResize = () => {
    setColumns(getColumnsWidth);
    setCurrentTransitionSpeed(0);
    setCurrentTranslate(0);
    setCurrentTransitionSpeed(transitionSpeed);
    const initialTimeout = 2000;
    setTimeout(() => {
      setCurrentTranslate(currentTranslate + 500);
    }, initialTimeout);
  };

  useEffect(() => {
    setColumns(getColumnsWidth);
  }, [posts]);

  const setDataChunk = (posts: readonly IPostWithCTA[]) => {
    dataChunk.posts = posts;
    dataChunk.isDataFullyFetched = true;
  };

  const mapChildrenToColumn = (posts: readonly IPostWithCTA[]) => {
    const layoutArray: [ReactNodeArray] = [[]];
    let iterator = 0;
    while (layoutArray.length < columns) layoutArray.push([]);

    posts.forEach(element => {
      layoutArray[iterator].push(
        [...children].find((child: { props: { post: { id: string } } }) => child.props.post.id === element.id)
      );
      iterator < layoutArray.length - 1 ? iterator++ : (iterator = 0);
    });
    return layoutArray;
  };

  return (
    <div
      className='waterfall'
      style={{
        transition: `transform ${currentTransitionSpeed}ms linear 0s`,
        transform: `translateY(-${currentTranslate}px)`,
      }}
      ref={waterfallRef}
      onTransitionEnd={onAnimationEnd}>
      {visiblePosts &&
        visiblePosts.length > 0 &&
        columnOffset &&
        columnOffset.length > 0 &&
        columnOffset.length === columns &&
        mapChildrenToColumn(visiblePosts).map((column, i) => (
          <div key={i} className='waterfall__column'>
            <div className='waterfall__column--part' style={{ transform: `translateY(${columnOffset[i].first}px)` }}>
              {column
                .filter((_, index) => index < column.length / 2)
                .map((post, index) => {
                  return <React.Fragment key={index}>{post}</React.Fragment>;
                })}
            </div>
            <div className='waterfall__column--part' style={{ transform: `translateY(${columnOffset[i].second}px)` }}>
              {column
                .filter((_, index) => index >= column.length / 2)
                .map((post, index) => {
                  return <React.Fragment key={index}>{post}</React.Fragment>;
                })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default WaterfallLayout;

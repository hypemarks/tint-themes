import React, { FC } from 'react';
import './square-photo-layout.sass';
import SquarePhotoPost from './components/post/square-photo-post';
import WaterfallLayout from '../common/layouts/waterfall-layout/waterfall-layout';
import { ICTAConfig } from '../common/components/call-to-action-group/call-to-action-group';
import { Nullable } from '@tintup/tint-sdk/lib';
import { globalConfig } from '../common/config/config';
import { IPostWithCTA } from '../types/Post';
import { Fragment } from 'react';
import useWindowSize from '../common/hooks/use-window-size';
import postStylePicker from '../utils/post-style-picker';
import LazyLoading from '../common/components/lazy-loading/lazdy-loading';
import MasonryLayout from 'react-masonry-component';

export interface ISquarePhotoPostsConfig {
  columns?: number;
  postPadding?: string;
  postWidth?: string;
  colorNameBarButtons?: Nullable<string>;
  shareButtons?: number;
  shareButtonOptions?: string[];
  imageEffect?: Nullable<string>;
  ctaConfig: ICTAConfig;
  textOnHover: boolean;
  noPopup: boolean;
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  isPopupLoaded: boolean;
}

export interface ILineClamp {
  post: number;
  highlightedPost: number;
}

export interface ISquarePhotoLayoutProps {
  isAutoScroll: boolean;
  posts: ReadonlyArray<IPostWithCTA>;
  postsConfig: ISquarePhotoPostsConfig;
  openPopup: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
}

export enum SquarePhotoLayoutClickTypeEnum {
  CTA_CLICK,
  POST_CLICK,
  ENTER_KEY,
}

export enum SquarePhotoLayoutStyleProps {
  FONT_SIZE = 'fontSize',
  FONT_COLOR = 'fontColor',
  FONT_FAMILY = 'fontFamily',
  MAIN_COLOR = 'colorNameBarButtons',
  POST_PADDING = 'postPadding',
  POST_WIDTH = 'postWidth',
}

const SquarePhotoLayout: FC<ISquarePhotoLayoutProps> = ({
  isAutoScroll,
  posts,
  postsConfig,
  openPopup,
  onCtaClick,
  openPostOnEnter,
}) => {
  const isMobile = globalConfig.regExp.mobile.test(navigator.userAgent);
  const shouldOpenPopup = !postsConfig.noPopup && !isMobile;

  const onClick = (
    type: SquarePhotoLayoutClickTypeEnum,
    post?: IPostWithCTA,
    event?: React.KeyboardEvent<HTMLDivElement>
  ) => {
    switch (type) {
      case SquarePhotoLayoutClickTypeEnum.CTA_CLICK:
        post && onCtaClick(post);
        break;

      case SquarePhotoLayoutClickTypeEnum.POST_CLICK:
        post && openPopup(post);
        break;

      case SquarePhotoLayoutClickTypeEnum.ENTER_KEY:
        post && event && shouldOpenPopup && openPostOnEnter(event, post);
        break;

      default:
        return;
    }
  };

  const { width: containerWidth } = useWindowSize();
  const styleProps = postStylePicker(SquarePhotoLayoutStyleProps, postsConfig, containerWidth);

  const getLineClampValue = (postWidth?: number, fontSize?: string): number => {
    return (postWidth && fontSize && Math.floor(postWidth / Number(fontSize.replace('px', '')))) || 1;
  };

  const oneLine = 1;

  const masonryOption = () => {
    const isFirstPostHighlighted = posts[0] && posts[0].attributes.highlighted;
    return {
      transitionDuration: globalConfig.masonry.transitionSpeed,
      columnWidth: isFirstPostHighlighted ? 1 : undefined,
    };
  };

  const lineClamp: ILineClamp = {
    post:
      getLineClampValue(styleProps.postDimensions && styleProps.postDimensions.postWidth, styleProps.style.fontSize) -
      oneLine,
    highlightedPost:
      getLineClampValue(
        styleProps.postDimensions && styleProps.postDimensions.highlightPostWidth,
        styleProps.style.fontSize
      ) - oneLine,
  };

  return (
    <div className='square-photo-layout'>
      <LazyLoading>
        {isAutoScroll ? (
          <WaterfallLayout
            posts={posts}
            postPadding={postsConfig.postPadding}
            configColumns={postsConfig.columns}
            postWidth={postsConfig.postWidth}>
            {posts.map((post: IPostWithCTA) => {
              return (
                <SquarePhotoPost
                  post={post}
                  config={postsConfig}
                  onClick={onClick}
                  style={styleProps.style}
                  lineClamp={lineClamp}
                  postDimensions={styleProps.postDimensions}
                />
              );
            })}
          </WaterfallLayout>
        ) : (
          <MasonryLayout elementType='div' options={masonryOption()} enableResizableChildren={true}>
            {posts.map((post: IPostWithCTA, index: number) => {
              return (
                <Fragment key={index}>
                  <SquarePhotoPost
                    post={post}
                    config={postsConfig}
                    onClick={onClick}
                    style={styleProps.style}
                    lineClamp={lineClamp}
                    postDimensions={styleProps.postDimensions}
                  />
                </Fragment>
              );
            })}
          </MasonryLayout>
        )}
      </LazyLoading>
    </div>
  );
};

export default SquarePhotoLayout;

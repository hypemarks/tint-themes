import React, { FC } from 'react';
import './styles/classic-layout.sass';
import { IPostWithCTA } from '../types/Post';
import MasonryLayout from 'react-masonry-component';
import WaterfallLayout from '../common/layouts/waterfall-layout/waterfall-layout';
import ClassicPost, { IClassicPostConfig } from './components/tint/post/classic-post';
import useWindowSize from '../common/hooks/use-window-size';
import postStylePicker from '../utils/post-style-picker';
import LazyLoading from '../common/components/lazy-loading/lazdy-loading';
import { globalConfig } from '../common/config/config';

export enum ClassicLayoutStyleProps {
  FONT_SIZE = 'fontSize',
  FONT_COLOR = 'fontColor',
  FONT_FAMILY = 'fontFamily',
  MAIN_COLOR = 'colorNameBarButtons',
  POST_PADDING = 'postPadding',
  POST_WIDTH = 'postWidth',
}

export interface IClassicLayoutProps {
  posts: readonly IPostWithCTA[];
  postsConfig: IClassicPostConfig;
  isAutoScroll?: boolean;
  openPopup: (post: IPostWithCTA) => void;
  openPostOnEnter: (event: React.KeyboardEvent<HTMLDivElement>, post: IPostWithCTA) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  transitionSpeed?: number;
}

export const ClassicLayout: FC<IClassicLayoutProps> = ({
  posts,
  isAutoScroll,
  postsConfig,
  openPopup,
  onCtaClick,
  openPostOnEnter,
  transitionSpeed,
}) => {
  const { width: containerWidth } = useWindowSize();
  const styleProps = postStylePicker(ClassicLayoutStyleProps, postsConfig, containerWidth);
  const masonryOption = () => {
    const isFirstPostHighlighted = posts[0].attributes.highlighted;
    return {
      transitionDuration: globalConfig.masonry.transitionSpeed,
      columnWidth: isFirstPostHighlighted ? 10 : null,
    };
  };
  return (
    <div className='classic-layout'>
      <LazyLoading>
        {isAutoScroll ? (
          <WaterfallLayout
            posts={posts}
            postPadding={postsConfig.postPadding}
            configColumns={postsConfig.columns}
            postWidth={postsConfig.postWidth}
            transitionSpeed={transitionSpeed}>
            {posts.map((post: IPostWithCTA) => {
              return (
                <ClassicPost
                  key={post.id}
                  post={post}
                  config={postsConfig}
                  onClickPost={openPopup}
                  isLazyLoading={false}
                  onCtaClick={onCtaClick}
                  onEnterKeyUp={openPostOnEnter}
                  style={styleProps.style}
                  postDimensions={styleProps.postDimensions}
                />
              );
            })}
          </WaterfallLayout>
        ) : (
          <MasonryLayout elementType='div' options={masonryOption()} enableResizableChildren={true}>
            {posts.map(post => {
              return (
                <div key={post.id}>
                  <ClassicPost
                    key={post.id}
                    post={post}
                    config={postsConfig}
                    onClickPost={openPopup}
                    onCtaClick={onCtaClick}
                    onEnterKeyUp={openPostOnEnter}
                    style={styleProps.style}
                    postDimensions={styleProps.postDimensions}
                  />
                </div>
              );
            })}
          </MasonryLayout>
        )}
      </LazyLoading>
    </div>
  );
};

export default ClassicLayout;

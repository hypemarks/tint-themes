import React, { useRef, FC } from 'react';
import { FileLinkClientService, Nullable } from '@tintup/tint-sdk/lib';
import { VideoWrapper } from '../../video/video-wrapper';
import './popup-post-image.sass';
import { IPostWithCTA } from '../../../../../types/Post';
import { globalConfig } from '../../../../../common/config/config';
import Image from '../../../../../common/components/image/image';
import { ITaggedProduct } from '../../../../../types/Product';

export interface IHighlightConfig {
  highlightMuteVideo?: boolean;
  highlightVideoPlayback?: string;
  highlightPostsToggle?: boolean;
}

export interface IPopupPostImageProps {
  post: IPostWithCTA;
  imageBackgroundColor?: Nullable<string>;
  noImages?: boolean;
  noImagesScaling?: boolean;
  imageEffect?: Nullable<string>;
  highlightConfig?: IHighlightConfig;
  isMounted: boolean;
  waterfallToggle: boolean;
  onVideoEnded?: () => void;
  taggedProducts?: ReadonlyArray<ITaggedProduct>;
  isProductMarkersVisible?: boolean;
}

export const PopupPostImage: FC<IPopupPostImageProps> = ({
  post,
  imageBackgroundColor,
  noImagesScaling,
  imageEffect,
  noImages,
  highlightConfig,
  isMounted,
  waterfallToggle,
  onVideoEnded,
  taggedProducts,
  isProductMarkersVisible,
}) => {
  const imageRef = useRef(null);

  const { highlightMuteVideo, highlightVideoPlayback, highlightPostsToggle } = highlightConfig || {};

  const style = imageBackgroundColor
    ? { background: imageBackgroundColor }
    : { background: globalConfig.popup.imageBackgroundColor };

  const {
    attributes: { video_url: videoUrl, image_url: imageUrl, alternative_text: alternativeText },
  } = post;

  let transformedImage = '';
  if (post.attributes.image_url) {
    const fileLinkClient = new FileLinkClientService({
      url: post.attributes.image_url,
      imageEffect: imageEffect,
      noImagesScaling,
    });

    transformedImage = !post.attributes.image_url.includes('api.tintup.com/v2/posts/images/')
      ? fileLinkClient
          .noMetadata()
          .resize({ width: globalConfig.fileStack.width.mediumMediaQuery })
          .applyEffect()
          .autoImage()
          .compress()
          .toString()
      : post.attributes.image_url;
  }

  const renderImage = () => {
    return imageUrl ? (
      <div className='popup-post-image__image' data-testid={'image'}>
        <div className='popup-post-image__wrapper'>
          <Image
            isProductMarkersVisible={isProductMarkersVisible}
            taggedProducts={taggedProducts}
            isOpenInPopup={true}
            src={transformedImage ? transformedImage : imageUrl}
            alt={alternativeText ? alternativeText : ''}
            className='popup-post-image__image'
            displayType={'normal'}
            isLazyLoading={false}
            ref={imageRef}
          />
        </div>
      </div>
    ) : null;
  };

  const renderMedia = () => {
    return !videoUrl ||
      (waterfallToggle && highlightPostsToggle && highlightVideoPlayback === globalConfig.highlightPosts.dontPlay) ? (
      renderImage()
    ) : (
      <VideoWrapper
        key={videoUrl}
        videoUrl={videoUrl}
        onEnded={onVideoEnded}
        muted={highlightMuteVideo}
        isMounted={isMounted}
      />
    );
  };

  return (
    <div className='popup-post-image' style={style}>
      {!noImages ? renderMedia() : null}
    </div>
  );
};

export default PopupPostImage;

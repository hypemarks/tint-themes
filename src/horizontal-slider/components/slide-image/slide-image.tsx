import React, { FC, MouseEvent } from 'react';
import { IPostWithCTA } from '../../../types/Post';
import { globalConfig } from '../../../common/config/config';
import Logger from '../../../utils/logger';
import { FileLinkClientService, Nullable } from '@tintup/tint-sdk/lib/';
import './slide-image.sass';
import CallToActionGroup, { ICTAConfig } from '../../../common/components/call-to-action-group/call-to-action-group';

interface ISlideImageConfig {
  url: string;
  imageEffect?: Nullable<string>;
  noImagesScaling?: boolean;
}

export interface IPropsSlideImage {
  onClick: (post: IPostWithCTA) => void;
  config: ISlideImageConfig;
  post: IPostWithCTA;
  shouldDisplayCta: boolean;
  activeCTAIndex: number;
  prevCta: (event: MouseEvent<HTMLElement>) => void;
  nextCta: (event: MouseEvent<HTMLElement>) => void;
  onCtaClick: (post: IPostWithCTA) => void;
  ctaConfig: ICTAConfig;
  tabIndex: number;
}

const SlideImage: FC<IPropsSlideImage> = ({
  onClick,
  post,
  config: { url, imageEffect, noImagesScaling },
  shouldDisplayCta,
  activeCTAIndex,
  prevCta,
  nextCta,
  onCtaClick,
  ctaConfig,
  tabIndex,
}) => {
  const onImageClick = () => onClick && onClick(post);

  let transformedImage = '';
  if (url) {
    try {
      const fileLinkClient = new FileLinkClientService({
        url: url,
        imageEffect: imageEffect,
        noImagesScaling,
      });

      transformedImage = !url.includes('api.tintup.com/v2/posts/images/')
        ? fileLinkClient
            .noMetadata()
            .resize({ width: globalConfig.fileStack.width.mediumMediaQuery })
            .applyEffect()
            .autoImage()
            .compress()
            .toString()
        : url;
    } catch (error) {
      Logger.warning(error);
      transformedImage = 'wrongpath';
    }
  }

  return (
    <div className='slide-image' onClick={onImageClick} style={{ backgroundImage: `url('${transformedImage}')` }}>
      {shouldDisplayCta && (
        <div className='slide-image__cta-wrapper slide-image__cta-wrapper--with-image'>
          <CallToActionGroup
            ctaConfig={ctaConfig}
            post={post}
            onCtaClick={onCtaClick}
            cta={[post.cta[activeCTAIndex]]}
            prevCta={prevCta}
            nextCta={nextCta}
            isInSliderTheme={true}
            tabIndex={tabIndex}
          />
        </div>
      )}
    </div>
  );
};

export default SlideImage;

import React, { FC, MouseEvent } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib';
import './call-to-action-group.sass';
import { IPostWithCTA, ICustomCTA } from '../../../types/Post';
import { globalConfig } from '../../config/config';
import CTAWrapper from '../cta-wrapper/cta-wrapper';

export interface IUTM {
  campaign?: Nullable<string>;
  source?: Nullable<string>;
  medium?: Nullable<string>;
  content?: Nullable<string>;
  term?: Nullable<string>;
}

export interface ICTAConfig {
  ctaButtonColor?: Nullable<string>;
  ctaButtonShow?: Nullable<string>;
  ctaButtonTextColor?: Nullable<string>;
  appendUtmToCta: Nullable<IUTM>;
}

interface ICallToActionGroupProps {
  ctaConfig: ICTAConfig;
  post: IPostWithCTA;
  onCtaClick?: (post: IPostWithCTA) => void;
  cta: ICustomCTA[];
  ctaLength?: number;
  prevCta?: (event: MouseEvent<HTMLElement>) => void;
  nextCta?: (event: MouseEvent<HTMLElement>) => void;
  isInPopup?: boolean;
  isInSliderTheme?: boolean;
  tabIndex?: number;
}

const CallToActionGroup: FC<ICallToActionGroupProps> = ({
  ctaConfig,
  ctaLength = 0,
  post,
  onCtaClick,
  cta,
  prevCta,
  nextCta,
  isInPopup = false,
  isInSliderTheme = false,
  tabIndex,
}) => {
  const {
    cta: { buttonColor, buttonShow, textColor },
  } = globalConfig;

  const handleCtaClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onCtaClick && onCtaClick(post);
  };

  return (
    <div className='call-to-action-group'>
      {cta.map(elem =>
        elem ? (
          <CTAWrapper
            key={elem.id}
            cta={elem}
            trackClick={handleCtaClick}
            textColor={textColor}
            buttonColor={buttonColor}
            prevCta={prevCta}
            nextCta={nextCta}
            ctaNo={ctaLength}
            isInPopup={isInPopup}
            globalConfig={{
              buttonColor,
              buttonShow,
              textColor,
            }}
            ctaConfig={ctaConfig}
            isInSliderTheme={isInSliderTheme}
            tabIndex={tabIndex}
          />
        ) : null
      )}
    </div>
  );
};

export default CallToActionGroup;

import React, { FC, MouseEvent } from 'react';

import './cta-wrapper.sass';
import { ICustomCTA } from '../../../types/Post';
import { ICTAConfig } from '../call-to-action-group/call-to-action-group';
import Button from '../button/button';
import { globalConfig } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

interface ICTAWrapperProps {
  cta?: ICustomCTA;
  trackClick: (event: MouseEvent<HTMLElement>) => void;
  textColor: string;
  buttonColor: string;
  prevCta?: (event: MouseEvent<HTMLElement>) => void;
  nextCta?: (event: MouseEvent<HTMLElement>) => void;
  ctaNo: number;
  isInPopup?: boolean;
  globalConfig: { buttonColor: string; buttonShow: string; textColor: string };
  ctaConfig: ICTAConfig;
  isInSliderTheme?: boolean;
  tabIndex?: number;
}

const CTAWrapper: FC<ICTAWrapperProps> = ({
  cta,
  trackClick,
  textColor,
  buttonColor,
  prevCta,
  nextCta,
  ctaNo,
  isInPopup = false,
  isInSliderTheme = false,
  tabIndex = 0,
  ctaConfig: { ctaButtonColor, ctaButtonShow, ctaButtonTextColor, appendUtmToCta },
}) => {
  const shouldBeDisplayed =
    ctaButtonShow &&
    ((ctaButtonShow === 'popup' && isInPopup) || (ctaButtonShow === 'post' && !isInPopup) || ctaButtonShow === 'both');

  const href = cta ? `${cta.url}${globalConfig.regExp.questionMark.test(cta.url) ? '&' : '?'}${appendUtmToCta}` : '';

  return cta && (!cta.coordinates || isInSliderTheme) && shouldBeDisplayed ? (
    <div className={`${isInPopup || isInSliderTheme ? 'cta-wrapper' : ''}`}>
      <div className={`cta-wrapper__inner ${isInPopup ? 'cta-wrapper__inner--inPopup' : ''}`}>
        {ctaNo > 1 && (isInPopup || isInSliderTheme) && (
          <button
            className='cta-wrapper__navigation cta-wrapper__navigation--prev'
            onClick={prevCta}
            tabIndex={tabIndex}>
            <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
          </button>
        )}
        {!cta.thumbnail_url || isInSliderTheme ? (
          <Button
            key={cta.id}
            href={href}
            onClick={trackClick}
            target='blank'
            className='cta-wrapper__button'
            tabIndex={tabIndex}
            style={{
              color: ctaButtonTextColor ? ctaButtonTextColor : textColor,
              background: ctaButtonColor ? ctaButtonColor : buttonColor,
            }}>
            <span>{cta.text}</span>
          </Button>
        ) : (
          <div className='cta-wrapper__with-image' key={cta.id}>
            <div>
              <img src={cta.thumbnail_url} alt={cta.text} className='cta-wrapper__image' />
            </div>
            <Button
              href={href}
              onClick={trackClick}
              target='blank'
              className='button-with-image'
              tabIndex={tabIndex}
              style={{
                color: ctaButtonTextColor ? ctaButtonTextColor : textColor,
                background: ctaButtonColor ? ctaButtonColor : buttonColor,
              }}>
              <span>{cta.text}</span>
            </Button>
          </div>
        )}
        {ctaNo > 1 && (isInPopup || isInSliderTheme) && (
          <button
            className='cta-wrapper__navigation cta-wrapper__navigation--next'
            onClick={nextCta}
            tabIndex={tabIndex}>
            <FontAwesomeIcon icon={faChevronRight} size={'sm'} />
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default CTAWrapper;

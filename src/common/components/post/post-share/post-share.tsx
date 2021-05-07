import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';
import ReactTooltip from 'react-tooltip';
import './post-share.sass';
import { globalConfig } from '../../../config/config';
import Share from '../../share/share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';

export interface IPostShareProps {
  url: string;
  text?: string;
  imageUrl: Nullable<string>;
  id: string;
  buttons?: number;
  options?: string[];
  colorNameBarButtons?: Nullable<string>;
  iconStyle?: {
    fontSize: string;
    color: string;
  };
  style?: CSSProperties;
}

export const PostShare: FC<IPostShareProps> = ({
  url,
  text,
  imageUrl,
  id,
  colorNameBarButtons,
  buttons,
  options,
  style,
  iconStyle = {
    fontSize: globalConfig.icons.common.share.fontSize,
    color: globalConfig.icons.common.share.color,
  },
}) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  const hideTooltipHandler = useCallback(() => {
    const tooltipWrapperEl = tooltipWrapperRef.current;
    if (tooltipWrapperEl) {
      ReactTooltip.hide(tooltipWrapperEl);
      setTooltipOpen(false);
      document.removeEventListener('click', hideTooltipHandler);
    }
  }, []);

  const onTooltipTriggerClick = useCallback(() => {
    const tooltipWrapperEl = tooltipWrapperRef.current;
    if (tooltipWrapperEl) {
      if (isTooltipOpen) {
        ReactTooltip.hide(tooltipWrapperEl);
        setTooltipOpen(false);
      } else {
        ReactTooltip.show(tooltipWrapperEl);
        setTooltipOpen(true);
        document.addEventListener('click', hideTooltipHandler);
      }
    }
  }, [isTooltipOpen]);

  useEffect(() => {
    return () => {
      document.removeEventListener('click', hideTooltipHandler);
    };
  }, []);

  const [color, setColor] = React.useState<string | undefined>(iconStyle.color);

  const handleMouseLeave = () => {
    setColor(iconStyle.color);
  };

  const handleMouseOver = () => {
    colorNameBarButtons && setColor(colorNameBarButtons);
  };

  return buttons !== 0 ? (
    <div className='post-share' style={style} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <FontAwesomeIcon
        color={color}
        icon={faShareAlt}
        size={'xs'}
        forwardedRef={tooltipWrapperRef}
        data-tip={true}
        data-for={`share--${id}`}
        data-event='focus'
        data-event-off=''
        tabIndex={0}
        onClick={onTooltipTriggerClick}
      />
      <ReactTooltip
        id={`share--${id}`}
        event='click'
        place='top'
        scrollHide={true}
        resizeHide={true}
        isCapture={true}
        effect='solid'
        type='light'
        clickable={true}
        className='react-tooltip'>
        <Share link={url} title={text} image={imageUrl} body={text} shareButtonsOptions={options} />
      </ReactTooltip>
    </div>
  ) : null;
};

export default PostShare;

import React, { FC } from 'react';
import TimeAgo from 'react-timeago';
import getFormatter from '../../../../../utils/time-ago';
import { globalConfig } from '../../../../config/config';
import Link from '../../../link/link';
import './popup-post-time.sass';
import { Nullable } from '@tintup/tint-sdk/lib';

export interface IPopupPostTimeProps {
  timeLanguage?: Nullable<string>;
  showTimestamp?: boolean;
  colorNameBarButtons?: Nullable<string>;
  publishedAt: string;
  url: string;
}

export const PopupPostTime: FC<IPopupPostTimeProps> = ({
  publishedAt,
  url,
  timeLanguage,
  showTimestamp,
  colorNameBarButtons,
}) => {
  const formatter = timeLanguage ? getFormatter(timeLanguage) : undefined;

  const shouldShowTimeStamp = showTimestamp !== undefined ? showTimestamp : globalConfig.popup.showTimestamp;

  return shouldShowTimeStamp ? (
    <Link
      className='popup-post-time'
      href={url}
      hoverColor={colorNameBarButtons ? colorNameBarButtons : undefined}
      initialColor={globalConfig.popup.postTimeLinkColor}
      ariaLabel={`published at ${publishedAt}`}>
      <TimeAgo date={publishedAt} formatter={formatter} />
    </Link>
  ) : null;
};

export default PopupPostTime;

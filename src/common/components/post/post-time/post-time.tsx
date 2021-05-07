import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';
import TimeAgo from 'react-timeago';
import './post-time.sass';
import getFormatter from '../../../../utils/time-ago';
import Link from '../../../../common/components/link/link';
import { globalConfig } from '../../../../common/config/config';

export interface IPostTimeProps {
  publishedAt: string;
  url: string;
  timeLanguage?: Nullable<string>;
  colorNameBarButtons?: Nullable<string>;
  tabIndex?: number;
}

export const PostTime: FC<IPostTimeProps> = ({ publishedAt, url, timeLanguage, colorNameBarButtons, tabIndex = 0 }) => {
  const formatter = timeLanguage ? getFormatter(timeLanguage) : getFormatter();

  return (
    <Link
      className='post-time'
      href={url}
      hoverColor={colorNameBarButtons ? colorNameBarButtons : undefined}
      initialColor={globalConfig.fontColorPost}
      ariaLabel={`published at ${publishedAt}`}
      tabIndex={tabIndex}>
      <TimeAgo date={publishedAt} formatter={formatter} />
    </Link>
  );
};

export default PostTime;

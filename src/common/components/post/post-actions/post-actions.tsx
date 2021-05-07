import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';
import './post-actions.sass';
import { globalConfig } from '../../../config/config';
import Link from '../../link/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faReply } from '@fortawesome/free-solid-svg-icons/faReply';
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet';

export interface IPostActionsProps {
  externalId: string;
  buttonsColor?: Nullable<string>;
}

export const PostActions: FC<IPostActionsProps> = ({ buttonsColor, externalId }) => {
  const color = buttonsColor ? buttonsColor : undefined;

  const openWindow = (href: string) =>
    window.open(href, 'Twitter', `width=${globalConfig.shareWindow.width},height=${globalConfig.shareWindow.height}`);

  return (
    <div className='post-actions' data-testid='post-actions'>
      <div className='post-actions__action'>
        <Link
          href={`https://twitter.com/intent/tweet?in_reply_to=${externalId}`}
          ariaLabel='Reply to this tweet. Opens in new window.'
          onClick={openWindow}>
          <FontAwesomeIcon icon={faRetweet} size={'sm'} color={color} />
        </Link>
      </div>
      <div className='post-actions__action'>
        <Link
          href={`https://twitter.com/intent/retweet?tweet_id=${externalId}`}
          ariaLabel='Re-tweet this tweet. Opens in new window.'
          onClick={openWindow}>
          <FontAwesomeIcon icon={faReply} size={'sm'} color={color} />
        </Link>
      </div>

      <div className='post-actions__action'>
        <Link
          href={`https://twitter.com/intent/favorite?tweet_id=${externalId}`}
          ariaLabel='Like this tweet. Opens in new window.'
          onClick={openWindow}>
          <FontAwesomeIcon icon={faHeart} size={'sm'} color={color} />
        </Link>
      </div>
    </div>
  );
};

export default PostActions;

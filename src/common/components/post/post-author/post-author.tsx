import { IAuthor } from '@tintup/tint-sdk/lib/';
import React, { FC } from 'react';
import './post-author.sass';
import Link from '../../../../common/components/link/link';
import { globalConfig } from '../../../../common/config/config';

export interface IPostAuthorProps {
  showName?: boolean;
  showUsername?: boolean;
  authorFontColor?: string;
  usernameFontColor?: string;
  author: IAuthor;
  isPopup?: boolean;
}

export const PostAuthor: FC<IPostAuthorProps> = ({
  author,
  showName,
  showUsername,
  authorFontColor,
  usernameFontColor,
  isPopup = false,
}) => {
  const authorStyles = {
    color: authorFontColor ? authorFontColor : globalConfig.popup.fontColorAuthor,
  };

  const userNameStyles = {
    color: usernameFontColor ? usernameFontColor : globalConfig.popup.fontColorAuthorUsername,
  };

  // we have to check if showName and showUsername aren't undefined because backend might not return it if user doesn't interact with personalization tab
  const shouldShowAuthorName =
    showName !== undefined
      ? (showName && author && author.name) || (showName && author)
      : globalConfig.popup.showAuthorName;
  // we have to check if showName and showUsername aren't undefined because backend might not return it if user doesn't interact with personalization tab
  const shouldShowUsername =
    showUsername !== undefined ? showUsername && author && author.username : globalConfig.popup.showAuthorUsername;

  const renderAuthorName = () => {
    if (shouldShowAuthorName) {
      return (
        <span
          className={`${!isPopup ? 'post-author__author-name' : 'post-author__author-name-popup'}`}
          style={authorStyles}
          data-testid={'author-name'}>
          {author && (author.name || author.username)}
        </span>
      );
    }
    return null;
  };

  const renderAuthorUsername = () => {
    if (shouldShowUsername) {
      return (
        <span
          className={`${!isPopup ? 'post-author__username' : 'post-author__username-popup'}`}
          style={userNameStyles}
          data-testid={'author-username'}>
          {author && author.username && `@${author.username}`}
        </span>
      );
    }
    return null;
  };

  return author ? (
    <div className='post-author'>
      <Link className='post-author__link' href={author.url} ariaLabel={`Posted by ${author.username || author.name}`}>
        {renderAuthorName()}
        {renderAuthorUsername()}
      </Link>
    </div>
  ) : null;
};

export default PostAuthor;

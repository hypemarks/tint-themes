import React, { FC, MouseEvent } from 'react';
import './post-content-link.sass';

interface IPostContentLinkProps {
  isButton: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  href: string;
  ariaLabel?: string;
  fontColor?: string;
}

const PostContentLink: FC<IPostContentLinkProps> = ({ children, isButton, onClick, href, ariaLabel, fontColor }) => {
  return isButton ? (
    <div className='post-content-link' role='button' onClick={onClick} data-testid='post-content-link-button'>
      {children}
    </div>
  ) : (
    <a
      className='post-content-link'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={ariaLabel}
      style={{ color: fontColor }}
      data-testid='post-content-link-anchor'>
      {children}
    </a>
  );
};

export default PostContentLink;

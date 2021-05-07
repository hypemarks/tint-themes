import React, { forwardRef, ReactNode } from 'react';
import './post-image-wrapper.sass';
import SourceIcon from '../../../source-icon/source-icon';
import Image from '../../../../../common/components/image/image';
import { PostType } from '@tintup/tint-sdk/';
import { ImageSizeTypes } from '../post-image';
import { globalConfig } from '../../../../config/config';
import { getIcon } from '../../../../../utils/post-source';
import { ITaggedProduct } from '../../../../../types/Product';

interface IPostImageWrapperProps {
  onClick?: () => void;
  href?: string;
  type?: PostType;
  displayType?: ImageSizeTypes;
  src?: string;
  alt?: string;
  children?: ReactNode;
  products?: ReadonlyArray<ITaggedProduct>;
  isLazyLoading?: boolean;
}

export type Ref = HTMLImageElement;

const PostImageWrapper = forwardRef<Ref, IPostImageWrapperProps>(
  (
    { onClick = () => ({}), href, children, displayType = 'normal', type, src = '', alt = '', products, isLazyLoading },
    ref
  ) => {
    const checkIsColorWhite = (type: PostType): boolean => {
      const icon = getIcon(type);
      return typeof icon !== 'undefined' && icon.color === '#fff';
    };

    return src ? (
      <div
        className={`post-image-wrapper post-image-wrapper--${displayType}`}
        onClick={onClick}
        role='button'
        data-testid='post-source-icon-image-wrapper-button'>
        <Image
          src={src}
          alt={alt}
          isLazyLoading={isLazyLoading}
          displayType={displayType}
          ref={ref}
          taggedProducts={products}
          className='theme-image'
        />
        {children}
        {type && <SourceIcon type={type} size='lg' />}
      </div>
    ) : (
      <a
        className='post-image-wrapper--no-image'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        data-testid='post-image-wrapper-anchor'>
        {type && (
          <SourceIcon
            type={type}
            size='2x'
            color={checkIsColorWhite(type) ? globalConfig.colorNamebarButtonsBackground : undefined}
          />
        )}
      </a>
    );
  }
);

export default PostImageWrapper;

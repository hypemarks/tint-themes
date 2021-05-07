import React, { forwardRef, useState, Fragment } from 'react';
import './image.sass';
import { ImageSizeTypes } from '../post/post-image/post-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ITaggedProduct } from '../../../types/Product';
import ProductMarker from '../ecommerce/product-marker/product-marker';

export interface IImageProps {
  src: string;
  alt: string;
  className?: string;
  displayType: ImageSizeTypes;
  isLazyLoading?: boolean;
  isOpenInPopup?: boolean;
  taggedProducts?: ReadonlyArray<ITaggedProduct>;
  isProductMarkersVisible?: boolean;
}

export type Ref = HTMLImageElement;

const ImageOrientationType = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  SQUARE: 'square',
};

const ImageStatus = {
  LOADED: 'loaded',
  FAILED: 'failed',
};

export const Image = forwardRef<Ref, IImageProps>(
  (
    {
      alt,
      src,
      className = '',
      displayType,
      isLazyLoading = true,
      isOpenInPopup = false,
      taggedProducts = [],
      isProductMarkersVisible,
    },
    ref
  ) => {
    const [imageStatus, setImageStatus] = useState('');
    const [imageOrientation, setImageOrientation] = useState(ImageOrientationType.HORIZONTAL);

    const handleImageStatus = (e: React.ChangeEvent<HTMLImageElement>) => {
      setImageStatus(ImageStatus.LOADED);
      setImageOrientation(getImageOrientation(e));
    };
    const renderImage = () => {
      return (
        <>
          {isLazyLoading ? (
            <img
              data-src={src}
              alt={alt}
              ref={ref}
              onLoad={handleImageStatus}
              onError={() => setImageStatus(ImageStatus.FAILED)}
            />
          ) : (
            <img
              src={src}
              alt={alt}
              ref={ref}
              onLoad={handleImageStatus}
              onError={() => setImageStatus(ImageStatus.FAILED)}
            />
          )}
        </>
      );
    };

    const getImageOrientation = (e: React.ChangeEvent<HTMLImageElement>) => {
      return e.target.naturalWidth > e.target.naturalHeight
        ? ImageOrientationType.HORIZONTAL
        : e.target.naturalWidth < e.target.naturalHeight
        ? ImageOrientationType.VERTICAL
        : ImageOrientationType.SQUARE;
    };

    const renderSelectedProducts = () => {
      return (
        imageStatus === ImageStatus.LOADED &&
        taggedProducts.length > 0 &&
        taggedProducts.map((product, index) => (
          <Fragment key={index}>
            <ProductMarker taggedProduct={product} />
          </Fragment>
        ))
      );
    };

    const renderPopupImage = () => {
      return (
        <div className={`image-popup image-popup--${imageOrientation}`}>
          {isProductMarkersVisible && renderSelectedProducts()}
          {renderImage()}
        </div>
      );
    };

    const renderClassicImage = () => {
      return (
        <>
          {renderImage()}
          {imageStatus === ImageStatus.FAILED && (
            <span className='image__icon-loading'>
              <FontAwesomeIcon icon={faImage} />
            </span>
          )}
        </>
      );
    };

    return (
      <div
        className={`image ${className} image--${displayType} ${
          imageStatus === ImageStatus.LOADED ? 'image--loaded' : 'image--loading'
        }`}
        data-testid={'image'}>
        {!isOpenInPopup ? renderClassicImage() : renderPopupImage()}
      </div>
    );
  }
);

export default Image;

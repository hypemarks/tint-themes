import { Nullable, PostType, IProductItem, ITaggedProduct } from '@tintup/tint-sdk/lib';
import React, { FC, useState, useEffect } from 'react';
import PopupPostImage, { IHighlightConfig } from './post/popup-post-image/popup-post-image';
import { IPostWithCTA, ICustomCTA } from '../../../types/Post';
import SourceIcon from '../source-icon/source-icon';
import CallToActionGroup, { ICTAConfig } from '../call-to-action-group/call-to-action-group';
import { globalConfig } from '../../config/config';
import './popup.sass';
import PopupPostTime from './post/popup-post-time/popup-post-time';
import PostShare from '../post/post-share/post-share';
import PostActions from '../post/post-actions/post-actions';
import PostAuthor from '../post/post-author/post-author';
import PostAvatar from '../post/post-avatar/post-avatar';
import PostContent from '../post/post-content/post-content';
import { getIcon } from '../../../utils/post-source';
import ProductsWrapper from '../ecommerce/products-wrapper/products-wrapper';
import { IProductListConfig } from '../ecommerce/product-list/product-list';

export interface ICarouselProps {
  post: IPostWithCTA;
  backgroundColor?: string;
  imageBackgroundColor?: Nullable<string>;
  noImages?: boolean;
  noImagesScaling?: boolean;
  imageEffect?: Nullable<string>;
  ctaConfig?: ICTAConfig;
  avatarBackgroundColor?: Nullable<string>;
  avatarTextColor?: Nullable<string>;
  showName?: boolean;
  showUsername?: boolean;
  authorFontColor?: string;
  usernameFontColor?: string;
  popupFontColor?: Nullable<string>;
  popupFontFamily?: Nullable<string>;
  timeLanguage?: Nullable<string>;
  showTimestamp?: boolean;
  colorNameBarButtons?: Nullable<string>;
  shareButtons?: number;
  shareButtonOptions?: string[];
  onVideoEnded?: () => void;
  onCtaClick?: (post: IPostWithCTA) => void;
  highlightConfig?: IHighlightConfig;
  isMounted: boolean;
  waterfallToggle?: boolean;
  taggedProducts: ReadonlyArray<ITaggedProduct>;
  productList: ReadonlyArray<IProductItem>;
  descriptionFontSize: number;
  isDescriptionHidden: boolean;
  isProductMarkersVisible: boolean;
  productConfig: IProductListConfig;
  popupSize: string;
}

export const Popup: FC<ICarouselProps> = ({
  post,
  taggedProducts,
  backgroundColor,
  imageBackgroundColor,
  noImages,
  noImagesScaling,
  imageEffect,
  ctaConfig,
  avatarBackgroundColor,
  avatarTextColor,
  showName,
  showUsername,
  authorFontColor,
  usernameFontColor,
  popupFontColor,
  popupFontFamily,
  timeLanguage,
  showTimestamp,
  colorNameBarButtons,
  shareButtons,
  shareButtonOptions,
  onVideoEnded,
  onCtaClick,
  highlightConfig,
  isMounted,
  waterfallToggle = false,
  productList,
  descriptionFontSize,
  isDescriptionHidden,
  productConfig,
  isProductMarkersVisible,
  popupSize,
}) => {
  const {
    attributes: {
      author,
      type,
      external_id: externalId,
      url,
      text,
      published_at: publishedAt,
      image_url: imageUrl,
      video_url: videoUrl,
      title,
    },
    id,
  } = post;

  const postContentLayoutStyles = backgroundColor
    ? { background: backgroundColor }
    : { background: globalConfig.popup.backgroundColor };

  const [activeCTAIndex, setActiveCTAIndex] = useState(0);
  const [ctaArray, setCtaArray] = useState<ICustomCTA[]>([]);

  const checkIsColorWhite = (type: PostType): boolean => {
    const icon = getIcon(type);
    return typeof icon !== 'undefined' && icon.color === '#fff';
  };

  useEffect(() => {
    const ctaArray = post.cta.filter(elem => !elem.coordinates);
    setCtaArray(ctaArray);
    setActiveCTAIndex(0);
  }, [post.id]);

  const prevCta = () => setActiveCTAIndex(prev => (prev === 0 ? post.cta.length - 1 : prev - 1));
  const nextCta = () => setActiveCTAIndex(prev => (prev === post.cta.length - 1 ? 0 : prev + 1));
  return (
    <div className='popup-post'>
      {imageUrl || videoUrl ? (
        <PopupPostImage
          isProductMarkersVisible={isProductMarkersVisible}
          taggedProducts={taggedProducts}
          post={post}
          onVideoEnded={onVideoEnded}
          imageBackgroundColor={imageBackgroundColor}
          noImages={noImages}
          noImagesScaling={noImagesScaling}
          imageEffect={imageEffect}
          highlightConfig={highlightConfig}
          isMounted={isMounted}
          waterfallToggle={waterfallToggle}
        />
      ) : null}
      <div
        className='popup-post__content-wrapper'
        style={
          imageUrl ? { ...postContentLayoutStyles } : { width: '100%', maxWidth: '100%', ...postContentLayoutStyles }
        }>
        <div className='popup-post__main-wrapper'>
          <header className='popup-post__header'>
            {author && (
              <PostAvatar
                author={author}
                isPopup={true}
                imageEffect={imageEffect}
                backgroundColor={avatarBackgroundColor}
                textColor={avatarTextColor}
                isLazyLoading={false}
              />
            )}
            {author && (
              <PostAuthor
                author={author}
                showName={showName}
                showUsername={showUsername}
                authorFontColor={authorFontColor}
                usernameFontColor={usernameFontColor}
                isPopup={true}
              />
            )}
            <SourceIcon
              type={type}
              size='2x'
              color={checkIsColorWhite(type) ? globalConfig.colorNamebarButtonsBackground : undefined}
            />
          </header>
          {!isDescriptionHidden && (
            <PostContent
              isHeightLimit={productList && productList.length > 0}
              popupSize={popupSize}
              url={url}
              isPopup={true}
              text={globalConfig.postTypesWithTitle.includes(type) ? title : text}
              fontColor={popupFontColor ? popupFontColor : undefined}
              fontSize={descriptionFontSize ? descriptionFontSize : undefined}
              fontFamily={popupFontFamily ? popupFontFamily : undefined}
            />
          )}

          {imageUrl && productList && productList.length !== 0 && (
            <ProductsWrapper config={productConfig} productList={productList} />
          )}
          {ctaConfig && [ctaArray[activeCTAIndex]] && (
            <CallToActionGroup
              ctaLength={ctaArray.length}
              post={post}
              ctaConfig={ctaConfig}
              onCtaClick={onCtaClick}
              cta={[ctaArray[activeCTAIndex]]}
              prevCta={prevCta}
              nextCta={nextCta}
              isInPopup={true}
            />
          )}

          <div className={`popup-post__bottom-wrapper ${!imageUrl && 'popup-post__bottom-space'}`}>
            <PopupPostTime
              url={url}
              publishedAt={publishedAt}
              timeLanguage={timeLanguage}
              showTimestamp={showTimestamp}
              colorNameBarButtons={colorNameBarButtons}
            />
            <div className='popup-post__bottom-wrapper-right'>
              {type === 'twitter' && <PostActions externalId={externalId} buttonsColor={colorNameBarButtons} />}
              <PostShare
                id={id}
                url={url}
                imageUrl={imageUrl}
                text={text}
                colorNameBarButtons={colorNameBarButtons}
                buttons={shareButtons}
                options={shareButtonOptions}
                style={{ padding: '0 0 0 7px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

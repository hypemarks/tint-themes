import React, { FC, RefObject, useEffect, useState } from 'react';
import { Group, Text, Wedge } from 'react-konva';
import useImage from 'use-image';
import { animated, Spring } from 'react-spring/renderprops-konva.cjs';
import Konva from 'konva';
import { FileLinkClientService, IPost, Nullable } from '@tintup/tint-sdk/lib/';
import { IPostWithCTA } from '../../types/Post';
import getFormatter from '../../utils/time-ago';
import { globalConfig } from '../../common/config/config';
import Avatar from './avatar';
import Footer from './footer';
import { KonvaEventObject } from 'konva/types/Node';

interface IPopupConfig {
  font: string;
  fontColor: string;
  imageEffect: Nullable<string>;
  timeLanguage?: Nullable<string>;
}

interface IPopupCircleProps {
  post: IPostWithCTA;
  positionX: number;
  positionY: number;
  circle: Konva.Circle;
  radius: number;
  rotation: number;
  onAnimationFinish: () => void;
  xCenterPosition: number;
  yCenterPosition: number;
  postTransitionSpeed: number;
  popupConfig: IPopupConfig;
  stageRef: RefObject<Konva.Stage>;
}

interface IAnimationCircleParam {
  x: number;
  y: number;
  radius: number;
}

export enum LinkType {
  POST_LINK = 'post_link',
  AUTHOR_LINK = 'author_link',
}

const PopupCircle: FC<IPopupCircleProps> = ({
  post,
  positionX,
  positionY,
  circle,
  radius,
  rotation,
  onAnimationFinish,
  xCenterPosition,
  yCenterPosition,
  postTransitionSpeed,
  popupConfig,
  stageRef,
}) => {
  const [showPopupContent, setShowPopupContent] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const { font, fontColor, imageEffect, timeLanguage } = popupConfig;
  const applyEffect = (imageUrl: string): string => {
    if (imageEffect) {
      const fileLinkClient = new FileLinkClientService({ url: imageUrl, imageEffect });
      return fileLinkClient.applyEffect().toString();
    }
    return imageUrl;
  };
  const formatter = timeLanguage ? getFormatter(timeLanguage) : getFormatter();
  const { image_url: imageUrl, author: postAuthor, published_at: time, type } = post.attributes;
  const [image] = useImage(imageUrl ? applyEffect(imageUrl) : '');
  const [avatar] = useImage(
    postAuthor && postAuthor.image_url ? postAuthor.image_url : globalConfig.urls.blankAvatarUrl
  );
  const scaleRadius = radius * 0.7;

  const scaleImage = (image: HTMLImageElement) => {
    const aspectRatio = (scaleRadius * 2) / scaleRadius;
    const imageRatio = image.width / image.height;
    if (aspectRatio >= imageRatio) {
      return {
        x: (scaleRadius * 2) / image.width,
        y: scaleRadius / (image.width / aspectRatio),
      };
    } else {
      return {
        x: (scaleRadius * 2) / (image.height * aspectRatio),
        y: scaleRadius / image.height,
      };
    }
  };

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.on('click', handleOnClick);
    }
    return () => {
      stageRef.current ? stageRef.current.off('click') : null;
    };
  }, [post]);

  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    switch (e.target.attrs['data-link']) {
      case LinkType.POST_LINK:
        if (post.attributes.url && post.attributes.url.length > 0) {
          window.open(post.attributes.url, '_blank');
        }
        break;

      case LinkType.AUTHOR_LINK:
        if (post.attributes.author && post.attributes.author.url && post.attributes.author.url.length > 0) {
          window.open(post.attributes.author.url, '_blank');
        }
        break;

      default:
        break;
    }
  };

  const onRest = () => {
    if (resetAnimation) {
      setResetAnimation(false);
      onAnimationFinish();
    } else if (!resetAnimation) {
      setTimeout(() => {
        setShowPopupContent(false);
        setResetAnimation(true);
      }, postTransitionSpeed);
    }
  };

  const onFrame = (circle: IAnimationCircleParam) => {
    if (!resetAnimation && circle.x < 1) {
      setShowPopupContent(true);
    }
  };

  const getAuthorName = (post: IPost): string | undefined => {
    if (post.attributes.author) {
      return post.attributes.author.name;
    }
    return undefined;
  };

  const getAuthorUsername = (post: IPost): string | undefined => {
    if (post.attributes.author) {
      return post.attributes.author.username;
    }
    return undefined;
  };

  const getImageOffset = (image: HTMLImageElement) => {
    return {
      x: image.width / 2,
      y:
        image.width > image.height && (scaleRadius / (image.width / 2)) * image.height < scaleRadius + image.height / 4
          ? image.height
          : image.height - image.height / 4,
    };
  };

  const getText = () => {
    if (post.attributes.text && post.attributes.type !== 'rss') {
      return `${post.attributes.text}`;
    } else if (post.attributes.title) {
      return `${post.attributes.title}`;
    }
    return undefined;
  };

  const renderPopupContent = () => {
    if (post.attributes.image_url) {
      return (
        <>
          <Text fontFamily={font} />
          {image && (
            <Wedge
              fillPatternImage={image}
              fillPatternOffset={getImageOffset(image)}
              fillPatternRotation={-180}
              fillPriority='pattern'
              fillPatternRepeat='no-repeat'
              fillPatternScale={scaleImage(image)}
              offsetX={0}
              offsetY={0}
              onFrame={onFrame}
              x={xCenterPosition}
              y={yCenterPosition}
              rotation={-180}
              angle={180}
              radius={scaleRadius}
            />
          )}
          <Avatar
            type={type}
            avatar={avatar}
            xCenterPosition={xCenterPosition}
            yCenterPosition={yCenterPosition}
            avatarCircleShift={{ x: 0, y: 0 }}
            iconCircleShift={{ x: 18, y: 18 }}
            iconShift={{ x: 12, y: 12 }}
          />
          {getAuthorName(post) && (
            <Text
              data-link={LinkType.AUTHOR_LINK}
              onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              x={xCenterPosition - scaleRadius}
              y={yCenterPosition + 36}
              fontFamily={font}
              fill={fontColor}
              width={scaleRadius * 2}
              text={`${getAuthorName(post)}`}
              align='center'
            />
          )}
          {!getAuthorName(post) && getAuthorUsername(post) && (
            <Text
              data-link={LinkType.AUTHOR_LINK}
              onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              x={xCenterPosition - scaleRadius}
              y={yCenterPosition + 36}
              width={scaleRadius * 2}
              fontFamily={font}
              fill={fontColor}
              text={`${getAuthorUsername(post)}`}
              align='center'
            />
          )}
          {getText() && (
            <Text
              data-link={LinkType.POST_LINK}
              onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              x={xCenterPosition - scaleRadius}
              y={yCenterPosition}
              width={scaleRadius * 2}
              height={scaleRadius}
              wrap={'word'}
              ellipsis={true}
              padding={64}
              fontSize={12}
              fill={fontColor}
              text={getText()}
              align='center'
              verticalAlign='middle'
              fontFamily={font}
            />
          )}
          {time && (
            <Footer
              font={font}
              fontColor={fontColor}
              position={{ x: xCenterPosition - scaleRadius * 0.7, y: yCenterPosition + scaleRadius - 48 }}
              time={time}
              formatter={formatter}
              width={scaleRadius * 1.4}
            />
          )}
        </>
      );
    }
    return (
      <>
        <Avatar
          data-link={LinkType.AUTHOR_LINK}
          type={type}
          avatar={avatar}
          xCenterPosition={xCenterPosition}
          yCenterPosition={yCenterPosition}
          avatarCircleShift={{ x: 0, y: -scaleRadius + 48 }}
          iconCircleShift={{ x: 18, y: -scaleRadius + 66 }}
          iconShift={{ x: 12, y: -scaleRadius + 60 }}
        />
        {getAuthorName(post) && (
          <Text
            data-link={LinkType.AUTHOR_LINK}
            onMouseEnter={() => {
              document.body.style.cursor = 'pointer';
            }}
            onMouseLeave={() => {
              document.body.style.cursor = 'default';
            }}
            x={xCenterPosition - scaleRadius}
            y={yCenterPosition - scaleRadius + 48 + 32}
            fontFamily={font}
            fill={fontColor}
            width={scaleRadius * 2}
            text={`${getAuthorName(post)}`}
            align='center'
          />
        )}
        {!getAuthorName(post) && getAuthorUsername(post) && (
          <Text
            data-link={LinkType.AUTHOR_LINK}
            onMouseEnter={() => {
              document.body.style.cursor = 'pointer';
            }}
            onMouseLeave={() => {
              document.body.style.cursor = 'default';
            }}
            x={xCenterPosition - scaleRadius}
            y={yCenterPosition - scaleRadius + 48 + 32}
            width={scaleRadius * 2}
            fontFamily={font}
            fill={fontColor}
            text={`${getAuthorUsername(post)}`}
            align='center'
          />
        )}
        {getText() && (
          <Text
            data-link={LinkType.POST_LINK}
            onMouseEnter={() => {
              document.body.style.cursor = 'pointer';
            }}
            onMouseLeave={() => {
              document.body.style.cursor = 'default';
            }}
            x={xCenterPosition - scaleRadius}
            y={yCenterPosition - scaleRadius}
            width={scaleRadius * 2}
            height={scaleRadius * 2}
            wrap={'char'}
            ellipsis={true}
            padding={94}
            verticalAlign={'middle'}
            fontFamily={font}
            fontSize={18}
            fill={fontColor}
            text={getText()}
            align='center'
          />
        )}
        {time && (
          <Footer
            font={font}
            fontColor={fontColor}
            position={{ x: xCenterPosition - scaleRadius * 0.7, y: yCenterPosition + scaleRadius - 48 }}
            time={time}
            formatter={formatter}
            width={scaleRadius * 1.4}
          />
        )}
      </>
    );
  };

  return (
    <>
      <Group rotation={rotation} x={xCenterPosition} y={yCenterPosition}>
        <Spring
          native
          from={{
            x: circle.attrs.x,
            y: circle.attrs.y,
            radius: 0,
          }}
          to={{
            x: positionX,
            y: positionY,
            radius: scaleRadius,
          }}
          onRest={onRest}
          onFrame={onFrame}
          reset={resetAnimation}
          reverse={resetAnimation}>
          {props => (
            <>
              <animated.Circle {...props} fill={circle.attrs.fill} />
            </>
          )}
        </Spring>
      </Group>
      {showPopupContent && renderPopupContent()}
    </>
  );
};

export default PopupCircle;

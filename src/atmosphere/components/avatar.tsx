import React, { FC } from 'react';
import { Circle, Text } from 'react-konva';
import { getIcon } from '../../utils/post-source';
import { LinkType } from './popup-circle';
import useImage from 'use-image';
import { PostType } from '@tintup/tint-sdk/lib/';

interface IShift {
  x: number;
  y: number;
}

interface IAvatarProps {
  avatar?: HTMLImageElement;
  type: PostType;
  xCenterPosition: number;
  yCenterPosition: number;
  avatarCircleShift: IShift;
  iconCircleShift: IShift;
  iconShift: IShift;
}

interface IIcon {
  name?: string;
  color: string;
  code?: string;
  img?: HTMLImageElement;
}

const Avatar: FC<IAvatarProps> = ({
  avatar,
  type,
  xCenterPosition,
  yCenterPosition,
  avatarCircleShift,
  iconCircleShift,
  iconShift,
}) => {
  const getSocialFeedIcon = (type: PostType): IIcon | undefined => {
    switch (type) {
      case 'tiktok':
        return {
          img: useImage('https://cdn.hypemarks.com/assets/profile/tiktok.svg')[0],
          color: '#000',
          code: undefined,
        };
      case 'spark':
        return {
          img: useImage('https://cdn.hypemarks.com/assets/profile/spark_white.png')[0],
          color: '#000',
          code: undefined,
        };
      case 'hootsuite':
        return {
          img: useImage('https://cdn.hypemarks.com/assets/profile/icon_hootsuite.png')[0],
          color: '#000',
          code: undefined,
        };
      default:
        return getIcon(type);
    }
  };

  const icon = getSocialFeedIcon(type);
  if ((type === 'custom' || 'externally_sourced_posts_account' || 'externally_sourced_posts') && icon)
    icon.color = '#000';

  return (
    <>
      {avatar && (
        <Circle
          data-link={LinkType.AUTHOR_LINK}
          onMouseEnter={() => {
            document.body.style.cursor = 'pointer';
          }}
          onMouseLeave={() => {
            document.body.style.cursor = 'default';
          }}
          radius={24}
          fillPatternImage={avatar}
          stroke='white'
          fillPatternRepeat='no-repeat'
          x={xCenterPosition + avatarCircleShift.x}
          y={yCenterPosition + avatarCircleShift.y}
          fillPatternOffset={{ x: avatar.width / 2, y: avatar.height / 2 }}
          fillPatternScale={{ x: 48 / avatar.width, y: 48 / avatar.height }}
        />
      )}
      {icon && (
        <>
          <Circle
            data-link={LinkType.AUTHOR_LINK}
            onMouseEnter={() => {
              document.body.style.cursor = 'pointer';
            }}
            onMouseLeave={() => {
              document.body.style.cursor = 'default';
            }}
            radius={12}
            fill={icon.color}
            stroke='white'
            x={xCenterPosition + iconCircleShift.x}
            y={yCenterPosition + iconCircleShift.y}
          />
          {icon.code && (
            <Text
              data-link={LinkType.AUTHOR_LINK}
              onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              x={xCenterPosition + iconShift.x}
              y={yCenterPosition + iconShift.y}
              text={icon.code}
              fontFamily='FontAwesome'
              fontSize={12}
              align='center'
              width={12}
              fill='white'
            />
          )}
          {icon.img && (
            <Circle
              data-link={LinkType.AUTHOR_LINK}
              onMouseEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                document.body.style.cursor = 'default';
              }}
              radius={12}
              stroke='white'
              fillPatternRepeat='no-repeat'
              fillPatternImage={icon.img}
              fillPatternOffset={{ x: icon.img.width / 2, y: icon.img.height / 2 }}
              fillPatternScale={{ x: 24 / icon.img.width, y: 24 / icon.img.height }}
              x={xCenterPosition + iconCircleShift.x}
              y={yCenterPosition + iconCircleShift.y}
            />
          )}
        </>
      )}
    </>
  );
};

export default Avatar;

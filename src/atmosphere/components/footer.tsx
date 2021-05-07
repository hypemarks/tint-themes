import React, { FC } from 'react';
import { Text } from 'react-konva';
import { LinkType } from './popup-circle';

interface IPosition {
  x: number;
  y: number;
}

interface IFooterProps {
  font: string;
  fontColor: string;
  position: IPosition;
  time: string;
  formatter: string;
  width: number;
}

const Footer: FC<IFooterProps> = ({ font, fontColor, time, position, width }) => {
  const dateParser = (date: string | number | Date): Date => {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.valueOf())) {
      return parsed;
    }

    const parts = String(date).match(/\d+/g);
    if (parts == null || parts.length <= 2) {
      return parsed;
    } else {
      const [firstP, secondP, ...restPs] = parts.map(x => parseInt(x));
      return new Date(Date.UTC(firstP, secondP - 1, ...restPs));
    }
  };

  const mapToTimeAgo = (time: string) => {
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    const timeNow = Date.now();
    const then = dateParser(time).valueOf();
    const seconds = Math.round(Math.abs(timeNow - then) / 1000);
    const suffix = then < timeNow ? 'ago' : 'from now';

    const [value, unit] =
      seconds < MINUTE
        ? [Math.round(seconds), 'second']
        : seconds < HOUR
        ? [Math.round(seconds / MINUTE), 'minute']
        : seconds < DAY
        ? [Math.round(seconds / HOUR), 'hour']
        : seconds < WEEK
        ? [Math.round(seconds / DAY), 'day']
        : seconds < MONTH
        ? [Math.round(seconds / WEEK), 'week']
        : seconds < YEAR
        ? [Math.round(seconds / MONTH), 'month']
        : [Math.round(seconds / YEAR), 'year'];

    return value + ' ' + unit + ' ' + suffix;
  };

  return (
    <Text
      data-link={LinkType.POST_LINK}
      onMouseEnter={() => {
        document.body.style.cursor = 'pointer';
      }}
      onMouseLeave={() => {
        document.body.style.cursor = 'default';
      }}
      x={position.x}
      y={position.y}
      width={width}
      fontFamily={font}
      fill={fontColor}
      text={`${mapToTimeAgo(time)}`}
      align='center'
    />
  );
};

export default Footer;

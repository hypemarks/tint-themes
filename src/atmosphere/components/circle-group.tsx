import React, { FC, MutableRefObject, useEffect, useState } from 'react';
import { Circle, Group } from 'react-konva';
import { IPostWithCTA } from '../../types/Post';
import Konva from 'konva';

interface ICircleGroupProps {
  posts: readonly IPostWithCTA[];
  atmosphereBlipColors: readonly string[];
  radius: number;
  xCenterPosition: number;
  yCenterPosition: number;
  circleGroupRef: MutableRefObject<Konva.Group | null>;
}

interface position {
  x: number;
  y: number;
}

const CircleGroup: FC<ICircleGroupProps> = ({
  posts,
  atmosphereBlipColors,
  radius,
  xCenterPosition,
  yCenterPosition,
  circleGroupRef,
}) => {
  const getColor = (i: number) => {
    const iterator = (currentIndex: number): number => {
      const nextIndex = currentIndex - atmosphereBlipColors.length;
      if (nextIndex < atmosphereBlipColors.length) {
        return nextIndex;
      }
      return iterator(nextIndex);
    };
    const realIndex = i <= 4 ? i : iterator(i);
    return atmosphereBlipColors[realIndex];
  };

  const [postPosition, setPostPosition] = useState<readonly position[]>([]);

  useEffect(() => {
    setPostPosition(posts.map((_, i) => getCirclePosition(i)));
  }, [posts, radius]);

  const getCirclePosition = (elementIndex: number): position => {
    const elementsLength = posts.length;
    const step = (2 * Math.PI) / elementsLength;
    const angle = elementIndex * step;
    return {
      x: Math.round(radius * Math.cos(angle) - 2) + Math.floor(Math.random() * Math.floor(radius * 0.1)),
      y: Math.round(radius * Math.sin(angle) - 2) + Math.floor(Math.random() * Math.floor(radius * 0.1)),
    };
  };

  return (
    <Group x={xCenterPosition} y={yCenterPosition} rotation={45} ref={circleGroupRef}>
      {postPosition.length === posts.length &&
        posts.map((_, i) => <Circle position={postPosition[i]} key={i} radius={4} fill={getColor(i)} />)}
    </Group>
  );
};

export default CircleGroup;

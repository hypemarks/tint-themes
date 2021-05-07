import React, { FC, useEffect, useRef, useState } from 'react';
import './atmosphere.sass';
import { IPostWithCTA } from '../types/Post';
import { Layer, Stage } from 'react-konva';
import Konva from 'konva';
import PopupCircle from './components/popup-circle';
import useWindowSize from '../common/hooks/use-window-size';
import CircleGroup from './components/circle-group';
import { Nullable } from '@tintup//tint-sdk/lib';

interface IAtmosphereConfig {
  atmosphereBlipColors: readonly string[];
  font: string;
  fontColor: string;
  imageEffect: string;
  postDuration: number;
  timeLanguage?: Nullable<string>;
}

interface IAtmosphereLayoutProps {
  posts: readonly IPostWithCTA[];
  config: IAtmosphereConfig;
}

interface ICurrentCirclePost {
  post: IPostWithCTA;
  circle: Konva.Circle | null;
  rotation: number;
  index: number;
}

const AtmosphereLayout: FC<IAtmosphereLayoutProps> = ({ posts, config }) => {
  const stageRef = useRef<any>(null); // Typing bug in konva library
  const layerRef = useRef<Konva.Layer>(null);
  const circleGroupRef = useRef<Konva.Group>(null);
  const [displayPosts, setDisplayPosts] = useState<readonly IPostWithCTA[]>([]);
  const [currentCirclePost, setCurrentCirclePost] = useState<ICurrentCirclePost>();
  const getXCenterPosition = () => (stageRef.current ? stageRef.current.getStage().width() / 2 : 0);
  const getYCenterPosition = () => (stageRef.current ? stageRef.current.getStage().height() / 2 : 0);
  const defaultRotation = 45;
  const { atmosphereBlipColors, font, fontColor, imageEffect, postDuration, timeLanguage } = config;
  const getRadius = () => {
    if (stageRef && stageRef.current) {
      return stageRef.current.getStage().width() < stageRef.current.getStage().height()
        ? (stageRef.current.getStage().width() / 2) * 0.8
        : (stageRef.current.getStage().height() / 2) * 0.8;
    }
    return 1;
  };

  useEffect(() => {
    const initAnimationDelay = 1000;
    if (displayPosts.length > 0) {
      setTimeout(() => {
        setCurrentCirclePost({
          post: displayPosts[0],
          circle: circleGroupRef.current ? (circleGroupRef.current.find('Circle')[0] as Konva.Circle) : null,
          rotation: circleGroupRef.current ? circleGroupRef.current.attrs.rotation : defaultRotation,
          index: 0,
        });
      }, initAnimationDelay);
    }
  }, [displayPosts]);

  useEffect(() => {
    if (posts.length !== displayPosts.length) {
      setDisplayPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    anim.start();
    offsetAnimation.start();
  }, [layerRef.current]);

  const windowSize = useWindowSize();

  const angularSpeed = 2;
  const anim = new Konva.Animation(frame => {
    const angleDiff = frame ? (frame.timeDiff * angularSpeed) / 1000 : 1;
    if (circleGroupRef && circleGroupRef.current) {
      circleGroupRef.current.rotate(angleDiff);
    }
  }, layerRef.current);

  const offsetAnimation = new Konva.Animation(frame => {
    if (circleGroupRef && circleGroupRef.current && frame) {
      Array.from(circleGroupRef.current.find('Circle')).forEach((circle: Konva.Circle, i: number) => {
        if (i % 2 === 0) {
          circle.offset({
            y:
              getRadius() *
              0.1 *
              Math.cos(((((frame.time * Math.abs(circle.attrs.x)) / 100) * Math.PI) / getRadius()) * 0.1 + i * 2),
            x:
              getRadius() *
              0.1 *
              Math.sin(((((frame.time * Math.abs(circle.attrs.y)) / 100) * Math.PI) / getRadius()) * 0.1 + i * 2),
          });
        } else {
          circle.offset({
            y:
              getRadius() *
              0.1 *
              Math.sin(((((frame.time * Math.abs(circle.attrs.x)) / 100) * Math.PI) / getRadius()) * 0.1 + i * 2),
            x:
              getRadius() *
              0.1 *
              Math.cos(((((frame.time * Math.abs(circle.attrs.y)) / 100) * Math.PI) / getRadius()) * 0.1 + i * 2),
          });
        }
      });
    }
  }, layerRef.current);

  const onPopupAnimationFinish = () => {
    const nextIndex =
      currentCirclePost && currentCirclePost.index < displayPosts.length - 1 ? currentCirclePost.index + 1 : 0;
    setCurrentCirclePost(() => ({
      post: displayPosts[nextIndex],
      circle: circleGroupRef.current ? (circleGroupRef.current.find('Circle')[nextIndex] as Konva.Circle) : null,
      rotation: circleGroupRef.current ? circleGroupRef.current.attrs.rotation : defaultRotation,
      index: nextIndex,
    }));
  };

  return (
    <div className='atmosphere-layout' id='atmosphere-layout'>
      <Stage ref={stageRef} width={windowSize.width} height={windowSize.height} container='atmosphere-layout'>
        <Layer ref={layerRef}>
          <CircleGroup
            posts={displayPosts}
            atmosphereBlipColors={atmosphereBlipColors}
            radius={getRadius()}
            xCenterPosition={getXCenterPosition()}
            yCenterPosition={getYCenterPosition()}
            circleGroupRef={circleGroupRef}
          />
          {circleGroupRef && circleGroupRef.current && circleGroupRef.current.find('Circle') && currentCirclePost && (
            <PopupCircle
              post={currentCirclePost.post}
              positionX={0}
              positionY={0}
              circle={currentCirclePost.circle as Konva.Circle}
              radius={getRadius()}
              yCenterPosition={getYCenterPosition()}
              xCenterPosition={getXCenterPosition()}
              rotation={circleGroupRef.current.attrs.rotation}
              onAnimationFinish={onPopupAnimationFinish}
              postTransitionSpeed={postDuration}
              stageRef={stageRef}
              popupConfig={{ font, fontColor, imageEffect, timeLanguage }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default AtmosphereLayout;

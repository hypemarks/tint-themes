import React, { FC, useRef } from 'react';

interface IVideoProps {
  videoUrl: string;
  onEnded?: () => void;
  muted?: boolean;
}

export const VideoPlayer: FC<IVideoProps> = ({ videoUrl, onEnded, muted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onLoadStart = () => {
    if (videoRef.current) {
      /*   videoRef.current.click() is hack way to work as an autoplay
      https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
      */
      videoRef.current.click();
      onEnded && videoRef.current.play().catch(onEnded);
    }
  };

  return (
    <video
      ref={videoRef}
      data-testid={'video-player'}
      width='100%'
      height='100%'
      preload='auto'
      autoPlay={true}
      muted={muted}
      playsInline={true}
      onEnded={onEnded}
      onLoadStart={onLoadStart}>
      <source type='video/mp4' src={videoUrl} />
    </video>
  );
};

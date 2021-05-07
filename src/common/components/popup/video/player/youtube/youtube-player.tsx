import React, { FC, useEffect, useRef } from 'react';
import loadSdk from './sdk-loader';
import { globalConfig } from '../../../../../config/config';
interface IYoutubePlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

export const YoutubePlayer: FC<IYoutubePlayerProps> = ({ videoUrl, onEnded }) => {
  const refPlayer = useRef<YT.Player>();

  const getId = () => {
    const youtubeIdRegExp = globalConfig.regExp.youtubeId;
    const match = videoUrl.match(youtubeIdRegExp);
    return match && match[2] && match[2].length === 11 ? match[2] : undefined;
  };

  const onPlayerStateChange = (event: YT.PlayerEvent) => {
    if (event.target.getPlayerState() === YT.PlayerState.ENDED) {
      onEnded && onEnded();
    }
  };

  useEffect(() => {
    loadSdk().then(() => {
      refPlayer.current = new window.YT.Player('youtube-player', {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    });
  }, []);

  return (
    <iframe
      id='youtube-player'
      data-testid={'youtube-player'}
      frameBorder={0}
      allowFullScreen={true}
      width='100%'
      height='100%'
      title='Youtube Video Player'
      src={`https://www.youtube.com/embed/${getId()}?enablejsapi=1&autoplay=1&rel=0&showinfo=0&controls=0&mute=1&playlist=${getId()}`}
    />
  );
};

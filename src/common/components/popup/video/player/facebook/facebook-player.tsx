import React, { FC, useEffect, useRef } from 'react';
import loadSdk from './sdk-loader';
import Logger from '../../../../../../utils/logger';

interface IFacebookPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

export const FacebookPlayer: FC<IFacebookPlayerProps> = ({ videoUrl, onEnded }) => {
  const container = useRef<HTMLDivElement>(null);

  // facebook typings don't handle xfbml.ready -> msg: any
  const handleXFBMLReady = function(msg: any) {
    if (msg.type === 'video') {
      const videoPlayer = msg.instance;
      onEnded && videoPlayer.subscribe('finishedPlaying', onEnded);
    }
  };

  useEffect(() => {
    loadSdk()
      .then(() => {
        const playerId = 'facebook-player';
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('fb-video');
        playerDiv.id = playerId;
        playerDiv.setAttribute('data-href', videoUrl);

        playerDiv.setAttribute('data-allowfullscreen', 'true');
        playerDiv.setAttribute('data-show-captions', 'true');
        playerDiv.setAttribute('data-mute', '0');
        playerDiv.setAttribute('data-autoplay', 'true');
        playerDiv.setAttribute('data-width', 'auto');

        if (container.current) {
          container.current.appendChild(playerDiv);
        }

        window.FB.init({ appId: process.env.REACT_APP_FACEBOOK_APP_ID!, xfbml: true, version: 'v3.2' });
        // facebook typings don't handle xfbml.ready ->
        window.FB.Event.subscribe('xfbml.ready' as fb.FacebookEventType, handleXFBMLReady);
      })
      .catch(err => Logger.error(err));
  }, []);

  return (
    <>
      <div id='fb-root' data-testid={'facebook-player'} />
      <div ref={container} />
    </>
  );
};

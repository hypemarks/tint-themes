import Player from '@vimeo/player/';
import React, { FC, useEffect, useRef } from 'react';
import { globalConfig } from '../../../../../config/config';

interface IVimeoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

export const VimeoPlayer: FC<IVimeoPlayerProps> = ({ videoUrl, onEnded }) => {
  const container = useRef<HTMLDivElement>(null);

  const getId = () => {
    const vimeoIdRegExp = globalConfig.regExp.vimeoId;
    const match = videoUrl.match(vimeoIdRegExp);
    return match && match[1] && match[1].length === 9 ? Number(match[1]) : undefined;
  };

  useEffect(() => {
    let player: Player;
    if (container.current) {
      player = new Player(container.current, {
        responsive: true,
        autoplay: true,
        id: getId(),
      });
      onEnded && player.on('ended', onEnded);
    }
    return () => {
      player.destroy();
    };
  }, []);

  return <div ref={container} data-testid={'vimeo-player'} />;
};

import React, { FC } from 'react';
import { globalConfig } from '../../../../../config/config';

interface IVinePlayerProps {
  videoUrl: string;
  onEnded?: () => void;
}

export const VinePlayer: FC<IVinePlayerProps> = ({ videoUrl }) => {
  const getId = () => {
    const vineIdRegExp = globalConfig.regExp.vineId;
    const match = videoUrl.match(vineIdRegExp);
    return match && match[1] ? match[1] : undefined;
  };

  return (
    <iframe
      className='vine-embed'
      data-testid={'vine-player'}
      src={`https://vine.co/v/${getId()}/card?audio=${true}&autoplay=${true}`}
      width='100%'
      height='100%'
      frameBorder='0'
    />
  );
};

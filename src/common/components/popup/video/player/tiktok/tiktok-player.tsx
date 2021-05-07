import React, { FC, useEffect } from 'react';
import { globalConfig } from '../../../../../config/config';

interface ITikTokProps {
  videoUrl: string;
  onEnded?: () => void;
}

export const TikTokPlayer: FC<ITikTokProps> = ({ videoUrl }) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = globalConfig.urls.tiktokSDKUrl;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: videoUrl }} data-testid={'tiktok-player'} />
    </>
  );
};

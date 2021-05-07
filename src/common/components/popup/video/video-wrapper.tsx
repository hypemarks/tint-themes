import React, { FC } from 'react';
import { FacebookPlayer } from './player/facebook/facebook-player';
import { VideoPlayer } from './player/other/video-player';
import { VimeoPlayer } from './player/vimeo/vimeo-player';
import { VinePlayer } from './player/vine/vine-player';
import { YoutubePlayer } from './player/youtube/youtube-player';
import { globalConfig } from '../../../config/config';
import { TikTokPlayer } from './player/tiktok/tiktok-player';

interface IVideoWrapperProps {
  videoUrl: string;
  onEnded?: () => void;
  muted?: boolean;
  isMounted: boolean;
}

export const VideoWrapper: FC<IVideoWrapperProps> = ({ videoUrl, onEnded, muted = false, isMounted }) => {
  const youtubeRegExp = globalConfig.regExp.youtubeUrl;
  const facebookRegExp = globalConfig.regExp.facebookUrl;
  const vimeoRegExp = globalConfig.regExp.vimeoUrl;
  const vine = globalConfig.regExp.vineUrl;
  const tiktok = globalConfig.regExp.tikTokClass;

  if (!isMounted) {
    return null;
  }

  if (youtubeRegExp.test(videoUrl)) {
    return <YoutubePlayer videoUrl={videoUrl} onEnded={onEnded} />;
  } else if (facebookRegExp.test(videoUrl)) {
    return <FacebookPlayer videoUrl={videoUrl} onEnded={onEnded} />;
  } else if (vimeoRegExp.test(videoUrl)) {
    return <VimeoPlayer videoUrl={videoUrl} onEnded={onEnded} />;
  } else if (vine.test(videoUrl)) {
    return <VinePlayer videoUrl={videoUrl} />;
  } else if (tiktok.test(videoUrl)) {
    return <TikTokPlayer videoUrl={videoUrl} />;
  }
  return <VideoPlayer videoUrl={videoUrl} onEnded={onEnded} muted={muted} />;
};

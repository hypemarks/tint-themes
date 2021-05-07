import React, { FC, useEffect, useState } from 'react';
import './full-screen-button.sass';
import Button from '../button/button';

declare global {
  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

export const FullScreenButton: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // switch instead of ifology?
  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  const fullScreenChangeHandler = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullScreenChangeHandler);
    return () => {
      document.removeEventListener('fullscreenchange', fullScreenChangeHandler);
    };
  }, []);

  return !isFullScreen ? (
    <div className='fullscreen'>
      <Button className='fullscreen__button' onClick={toggleFullScreen}>
        Click to enable full screen
      </Button>
    </div>
  ) : null;
};

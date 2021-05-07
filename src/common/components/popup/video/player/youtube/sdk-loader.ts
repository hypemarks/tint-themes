import scriptLoader from '../script-loader';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

// eslint-disable-next-line
const loadSdk = (): Promise<{ Player: Function }> => {
  // eslint-disable-next-line
  return new Promise<{ Player: Function }>(resolve => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    } else {
      scriptLoader('https://www.youtube.com/iframe_api');
    }

    const previous = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (previous) {
        previous();
      }

      resolve(window.YT);
    };
  });
};

export default loadSdk;

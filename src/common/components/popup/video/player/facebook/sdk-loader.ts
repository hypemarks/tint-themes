/* eslint-disable @typescript-eslint/no-explicit-any */
import scriptLoader from '../script-loader';

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

const loadSdk = (): Promise<fb.FacebookStatic> => {
  const iframeAPIReady = new Promise<fb.FacebookStatic>(resolve => {
    if (window.FB) {
      resolve(window.FB);
      return;
    } else {
      scriptLoader('https://connect.facebook.net/en_US/sdk.js');
    }

    const previous = window.fbAsyncInit;

    window.fbAsyncInit = () => {
      if (previous) {
        previous();
      }

      resolve(window.FB);
    };
  });

  return iframeAPIReady;
};

export default loadSdk;

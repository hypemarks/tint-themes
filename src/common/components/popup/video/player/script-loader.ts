interface IAttrs {
  [key: string]: string;
}

const loadScript = (src: string, attrs?: IAttrs, parentNode?: HTMLElement): Promise<HTMLScriptElement> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = src;

    for (const [key, value] of Object.entries(attrs || {})) {
      script.setAttribute(key, value);
    }

    script.addEventListener('load', () => {
      resolve(script);
    });

    script.addEventListener('error', () => {
      reject(new Error(`Failed to load ${src}`));
    });

    const node = parentNode || document.head || document.getElementsByTagName('head')[0];
    node.appendChild(script);
  });

export default loadScript;

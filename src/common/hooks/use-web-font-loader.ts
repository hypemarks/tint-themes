import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { IPersonalization } from '@tintup/tint-sdk/lib';

export default (personalization: IPersonalization): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (personalization.attributes.data.font_secondary) {
      WebFont.load({
        classes: true,
        google: {
          families: [`${personalization.attributes.data.font_secondary}`],
        },
        active() {
          setLoaded(true);
        },
      });
    }
  }, [personalization]);

  return loaded;
};

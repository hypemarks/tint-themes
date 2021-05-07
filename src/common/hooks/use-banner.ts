import { Nullable, IBanner } from '@tintup/tint-sdk/lib';

const useBanner = (banner?: IBanner): Nullable<{ url: string; height: number }> => {
  if (!banner) {
    return null;
  }

  const { height, url } = banner;

  return { url, height };
};

export default useBanner;

import { Nullable } from '@tintup/tint-sdk/lib';

export default ({
  textColor,
  genericTextColor,
  backgroundColor,
  genericBackgroundColor,
  username,
}: {
  textColor?: Nullable<string>;
  genericTextColor: string;
  backgroundColor?: Nullable<string>;
  genericBackgroundColor: string;
  username: string;
}): string => {
  return username
    ? `https://cdn.filestackcontent.com/Aoba6jBccRfypjdfz6rPLz/fallback=handle:yU5GaKZQQsGhHZX9v0iE/https://asset-cache-3.hypemarks.com/image/unknown/co_${encodeURIComponent(
        textColor || genericTextColor
      )},b_${encodeURIComponent(backgroundColor || genericBackgroundColor)},c_fill/${username.substring(0, 1)}`
    : 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png';
};

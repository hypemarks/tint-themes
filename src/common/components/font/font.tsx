import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';

interface IFontProps {
  fontConfig: {
    fontFamily?: Nullable<string>;
    fontUrl?: Nullable<string>;
  };
}

const Font: FC<IFontProps> = ({ fontConfig: { fontFamily, fontUrl } }) => {
  const fontFaceTemplate = `@font-face {
    font-family: "${fontFamily}";
    src: url("${fontUrl}");
    font-display: swap;
  }`;

  return !fontUrl && fontFamily ? (
    <link
      rel='stylesheet'
      href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;700&display=swap" rel="stylesheet"`}
      media='all'
      data-testid='font-link-tag'
    />
  ) : (
    <style dangerouslySetInnerHTML={{ __html: fontFaceTemplate }} data-testid='font-style-tag' />
  );
};

export default Font;

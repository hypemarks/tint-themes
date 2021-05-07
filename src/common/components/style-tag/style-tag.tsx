import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib';

interface IStyleTagProps {
  customCSS?: Nullable<string>;
}

const StyleTag: FC<IStyleTagProps> = ({ customCSS }) => {
  return customCSS ? <style data-testid='style-tag' dangerouslySetInnerHTML={{ __html: `${customCSS}` }} /> : null;
};

export default StyleTag;

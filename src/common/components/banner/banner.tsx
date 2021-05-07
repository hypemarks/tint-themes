import React, { FC } from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';
import './banner.sass';

export interface IBannerProps {
  banner: Nullable<{
    url: string;
    height: number;
  }>;
}

export const Banner: FC<IBannerProps> = ({ banner }) => {
  return banner && <div className='banner' style={{ backgroundImage: `url(${banner.url})`, height: banner.height }} />;
};

export default Banner;

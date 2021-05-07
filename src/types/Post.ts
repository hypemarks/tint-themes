import { IPost, Nullable } from '@tintup/tint-sdk';

export interface ICustomCTA {
  text: string;
  url: string;
  thumbnail_url: Nullable<string>;
  type: string;
  coordinates: Nullable<string[]>;
  id: string;
}

export interface IPostWithCTA extends IPost {
  cta: ICustomCTA[];
}

import { useState, useEffect } from 'react';
import { getGenericAvatar, globalConfig } from '../../index';
import { Nullable, IAuthor, FileLinkClientService } from '@tintup/tint-sdk';

interface IAvatarConfig {
  backgroundColor?: Nullable<string>;
  textColor?: Nullable<string>;
  imageEffect?: Nullable<string>;
}

interface IUseSetSourceForAvatarsParams {
  author: Nullable<IAuthor>;
  avatarConfig: IAvatarConfig;
}

export default ({ author, avatarConfig }: IUseSetSourceForAvatarsParams): string => {
  const [source, setSource] = useState('');

  const { textColor, backgroundColor, imageEffect } = avatarConfig;

  useEffect(() => {
    if (author && !author.image_url) {
      const genericAvatar = getGenericAvatar({
        textColor,
        backgroundColor,
        genericTextColor: globalConfig.genericAvatarTextColor,
        genericBackgroundColor: globalConfig.genericAvatarBackgroundColor,
        username: author.username,
      });
      setSource(genericAvatar);
    } else if (author && author.image_url) {
      const fileLinkClient = new FileLinkClientService({ url: author.image_url, imageEffect });
      setSource(
        fileLinkClient
          .applyEffect()
          .autoImage()
          .compress()
          .toString()
      );
    }
  }, [author, backgroundColor, textColor, imageEffect]);

  return source;
};

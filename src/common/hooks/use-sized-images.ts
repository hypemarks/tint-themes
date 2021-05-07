import { FileLinkClientService, Nullable } from '@tintup/tint-sdk/lib';
import useMediaQuery from './use-media-query';
import { globalConfig } from '../config/config';

export default (imageUrl: Nullable<string>, imageEffect?: Nullable<string>, noImagesScaling?: boolean): string => {
  const xSmallMediaQuery = useMediaQuery('(min-width: 576px)');
  const smallMediaQuery = useMediaQuery('(min-width: 768px)');
  const mediumMediaQuery = useMediaQuery('(min-width: 992px)');

  let result = '';

  try {
    if (imageUrl) {
      const fileLinkClient = new FileLinkClientService({
        url: imageUrl,
        imageEffect,
        noImagesScaling,
      });
      result = fileLinkClient
        .resize({ width: globalConfig.fileStack.width.default })
        .applyEffect()
        .toString();
      fileLinkClient.reset();
      if (xSmallMediaQuery) {
        result = fileLinkClient
          .resize({ width: globalConfig.fileStack.width.xSmallMediaQuery })
          .applyEffect()
          .toString();
        fileLinkClient.reset();
      }
      if (smallMediaQuery || mediumMediaQuery) {
        result = fileLinkClient
          .resize({ width: globalConfig.fileStack.width.smallMediaQuery })
          .applyEffect()
          .toString();
        fileLinkClient.reset();
      }
    }
  } catch (e) {
    result = 'not valid url';
  }
  return result;
};

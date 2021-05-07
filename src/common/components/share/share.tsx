import * as React from 'react';
import { Nullable } from '@tintup/tint-sdk/lib';
import SHARE_OPTIONS from './share-options';
import './share.sass';
import { globalConfig } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ShareProps {
  link?: string;
  title?: string;
  image: Nullable<string>;
  body?: string;
  shareButtonsOptions?: string[];
}
const Share: React.FC<ShareProps> = ({ link, title, image, body, shareButtonsOptions }) => {
  const options =
    shareButtonsOptions && shareButtonsOptions.length !== 0 ? shareButtonsOptions : globalConfig.defaultShareOptions;

  return (
    <ul>
      {Object.keys(SHARE_OPTIONS).map(key => {
        if (options.includes(key)) {
          const shareOption = SHARE_OPTIONS[key];
          const { icon, color } = shareOption;
          const titleScrubbed = title && title.replace(globalConfig.regExp.url, '');
          const url = shareOption.getUrl({
            link,
            title,
            image,
            body,
            titleScrubbed,
          });
          return (
            <li key={key} className='share-option'>
              <a className='share-option__link' href={url} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon size={'xs'} color={color} icon={icon} />
                <span className='share-name'>{SHARE_OPTIONS[key].name}</span>
              </a>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default Share;

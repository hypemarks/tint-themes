import { render } from '@testing-library/react';
import React from 'react';
import { buildPost } from '../../../../../../test/generate';
import PopupPostImage from './popup-post-image';
import { IPostWithCTA } from '../../../../../index';

jest.mock('@tintup/tint-sdk/lib', () => {
  return {
    FileLinkClientService: jest.fn(() => ({
      noMetadata: jest.fn(() => ({
        resize: jest.fn(() => ({
          applyEffect: jest.fn(() => ({
            autoImage: jest.fn(() => ({
              compress: jest.fn(() => ({
                toString: jest.fn(),
              })),
            })),
          })),
        })),
      })),
    })),
  };
});

describe('Test <PopupPostImage /> Component', () => {
  const post = buildPost({ attributes: { image_url: 'image_url' } });
  const config = {
    onCtaClick: jest.fn,
    ctaConfig: { appendUtmToCta: {} },
    highlightConfig: {},
    isMounted: false,
    waterfallToggle: false,
  };

  it('should render snapshot', () => {
    const wrapper = render(
      <PopupPostImage
        post={post as IPostWithCTA}
        highlightConfig={config.highlightConfig}
        isMounted={config.isMounted}
        waterfallToggle={config.waterfallToggle}
        onVideoEnded={jest.fn}
        taggedProducts={[]}
      />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should not render image', () => {
    const wrapper = render(
      <PopupPostImage
        post={post as IPostWithCTA}
        highlightConfig={config.highlightConfig}
        isMounted={config.isMounted}
        noImages={true}
        waterfallToggle={config.waterfallToggle}
        onVideoEnded={jest.fn}
        taggedProducts={[]}
      />
    );
    const image = wrapper.queryByTestId('image');
    expect(image).not.toBeInTheDocument();
  });
});

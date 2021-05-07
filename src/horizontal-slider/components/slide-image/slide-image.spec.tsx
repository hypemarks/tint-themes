import { render } from '@testing-library/react';
import React from 'react';
import SlideImage from './slide-image';
import { buildPost } from '../../../../test/generate';
import { IPostWithCTA } from '../../..';

describe('Test <SlideImage /> Component', () => {
  const postWithCTA = buildPost({
    cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
  });

  it('should render snapshot', () => {
    const wrapper = render(
      <SlideImage
        post={postWithCTA as IPostWithCTA}
        config={{
          url: 'https://i.picsum.photos/id/230/200/300.jpg?hmac=pyhlpgJN2oBeEzhJbnJYrCsLoJM6MKd_NUQGIQhVx5k',
        }}
        ctaConfig={{
          ctaButtonColor: null,
          ctaButtonShow: null,
          ctaButtonTextColor: null,
          appendUtmToCta: null,
        }}
        onCtaClick={() => {}}
        onClick={() => {}}
        nextCta={() => {}}
        prevCta={() => {}}
        activeCTAIndex={0}
        shouldDisplayCta={false}
        tabIndex={0}
      />
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

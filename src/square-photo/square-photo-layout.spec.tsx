import React from 'react';
import SquarePhotoLayout from './square-photo-layout';
import { render } from '@testing-library/react';
import '../../test/intersectionObserverMock';

const SquarePhotoLayoutConfig = {
  columns: 2,
  postPadding: '20px',
  postWidth: '1500px',
  ctaConfig: {
    ctaButtonColor: '',
    ctaButtonShow: '',
    ctaButtonTextColor: '',
    appendUtmToCta: null,
  },
  textOnHover: true,
  imageEffect: '',
  colorNameBarButtons: '',
  shareButtons: undefined,
  shareButtonOptions: undefined,

  fontFamily: '',
  fontSize: '',
  fontColor: '',
  waterfallConfig: {
    highlightPostsToggle: false,
    postTransitionSpeed: '100',
    isClosedByHighlightPostFeature: true,
    setIsClosedByHighlightPostFeature: 'setMessages',
    columns: 3,
    postWidth: '32',
    postPadding: '32',
  },
  noPopup: false,
  isPopupLoaded: false,
};

const PostMock: ReadonlyArray<any> = [
  {
    id: '13909',
    type: 'post',
    attributes: {
      highlighted: false,
      pinned: false,
      tags: [],
      title: null,
      text:
        '#dreamsmp #dream #mcyt #sapnap #georgenotfound #wilbursoot #discord #discordserver #hangout #blm #acab #lgbtrights #prochoice #womensrights #biden2020 #dumptrump #dumptrump2020 #polishcow #amongus #minecraft #eret #quackity #jschlatt #nihachu #wilbursoot #discordinvite #invite',
      url: 'http://twitter.com/spookpeak/status/1323218287573032960',
      external_id: '1323218287573032960',
      type: 'twitter',
      published_at: '2020-11-02T10:59:58.000Z',
      expires_at: null,
      image_url: null,
      video_url: null,
      author: {
        image_url: 'http://pbs.twimg.com/profile_images/1317132010767384576/YlTLHYIq_normal.jpg',
        name: 'seb',
        url: 'http://twitter.com/spookpeak',
        username: 'spookpeak',
      },
      metadata: { sentiment: 'neutral' },
    },
    relationships: { cta_associations: { data: [] } },
    cta: [],
  },
];

const onCTAClick = jest.fn();
const onClick = jest.fn();
const openPopup = jest.fn();

describe('Test SquarePhotoLayout Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <SquarePhotoLayout
        isAutoScroll={false}
        posts={PostMock}
        openPopup={openPopup}
        onCtaClick={onCTAClick}
        openPostOnEnter={onClick}
        postsConfig={SquarePhotoLayoutConfig}
      />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

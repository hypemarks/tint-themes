import { render } from '@testing-library/react';
import React from 'react';
import { SlideContent } from './slide-content';
import { buildPost, buildSliderConfig } from '../../../../test/generate';
import { IPostWithCTA } from '../../..';

describe('Test <SlideContent /> Component', () => {
  const RealDate = Date;
  beforeEach(() => {
    // @ts-ignore
    global.Date = class extends Date {
      constructor() {
        // @ts-ignore
        return super('1992-05-20T10:20:30Z');
      }

      getTime() {
        return new Date('1992-05-20T10:20:30Z').getTime();
      }
    };
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it('should render snapshot', () => {
    const postWithCTA = buildPost({
      cta: [{ text: 'text', url: 'url', thumbnail_url: null, type: 'cta', coordinates: null, id: 'id' }],
    });

    const config = buildSliderConfig();

    const wrapper = render(
      <SlideContent
        post={postWithCTA as IPostWithCTA}
        config={config}
        onCtaClick={() => {}}
        onClick={() => {}}
        nextCta={() => {}}
        prevCta={() => {}}
        tabIndex={0}
        activeCTAIndex={0}>
        <div>content goes here</div>
      </SlideContent>
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

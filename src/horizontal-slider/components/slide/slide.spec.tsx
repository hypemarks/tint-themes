import { render } from '@testing-library/react';
import React from 'react';
import Slide from './slide';
import { buildPost, buildSliderConfig } from '../../../../test/generate';
import { IPostWithCTA } from '../../..';

describe('Test <Slide /> Component', () => {
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

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
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
      <Slide
        flexBasis={25}
        post={postWithCTA as IPostWithCTA}
        config={config}
        onImagaClick={() => {}}
        onSlideContentClick={() => {}}
        onCtaClick={() => {}}
        openPostOnEnter={() => {}}
        id='id'
        tabIndex={0}
      />
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

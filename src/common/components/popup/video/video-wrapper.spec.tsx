import { render } from '@testing-library/react';
import React from 'react';
import { VideoWrapper } from './video-wrapper';

describe('Test <VideoWrapper /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<VideoWrapper videoUrl={'url'} onEnded={jest.fn} isMounted={true} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render video component for youtube', () => {
    const wrapper = render(
      <VideoWrapper
        videoUrl={'https://www.youtube.com/watch?v=3NQnnhlRWmc&ab_channel=PolskieNagrania'}
        onEnded={jest.fn}
        isMounted={true}
      />
    );
    const video = wrapper.queryByTestId('youtube-player');
    expect(video).toBeInTheDocument();
  });

  it('should render video component for facebook', () => {
    const wrapper = render(
      <VideoWrapper videoUrl={'https://www.facebook.com/videos/video'} onEnded={jest.fn} isMounted={true} />
    );
    const video = wrapper.queryByTestId('facebook-player');
    expect(video).toBeInTheDocument();
  });

  it('should render video component for vine', () => {
    const wrapper = render(
      <VideoWrapper videoUrl={'https://www.vine.co/videoaa'} onEnded={jest.fn} isMounted={true} />
    );
    const video = wrapper.queryByTestId('vine-player');
    expect(video).toBeInTheDocument();
  });

  it('should render video component for tiktok', () => {
    const wrapper = render(<VideoWrapper videoUrl={'tiktok-embed'} onEnded={jest.fn} isMounted={true} />);
    const video = wrapper.queryByTestId('tiktok-player');
    expect(video).toBeInTheDocument();
  });

  it('should render video component for vimeo', () => {
    const wrapper = render(<VideoWrapper videoUrl={'https://vimeo.com/76979871'} onEnded={jest.fn} isMounted={true} />);
    const video = wrapper.queryByTestId('vimeo-player');
    expect(video).toBeInTheDocument();
  });

  it('should render video component for other type of social media', () => {
    const wrapper = render(<VideoWrapper videoUrl={'random-video-url'} onEnded={jest.fn} isMounted={true} />);
    const video = wrapper.queryByTestId('video-player');
    expect(video).toBeInTheDocument();
  });
});

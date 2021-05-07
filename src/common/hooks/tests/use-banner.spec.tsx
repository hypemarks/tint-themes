import { render } from '@testing-library/react';
import React from 'react';
import useBanner from '../use-banner';
import { IBanner } from '@tintup/tint-sdk/lib';

const TestComponent = ({ banner }: { banner: IBanner }) => {
  const bannerData = useBanner(banner);
  if (bannerData) {
    return <img data-testid='banner' alt='' src={bannerData.url} style={{ height: bannerData.height }} />;
  } else {
    return null;
  }
};

describe('Test useBanner Hook', () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should return null if banner does not exist', () => {
    const wrapper = render(<TestComponent banner={null} />, container);
    const banner = wrapper.queryByTestId('banner');
    expect(banner).toBe(null);
  });

  it('should render banner', () => {
    const wrapper = render(<TestComponent banner={{ url: 'tintup.com', height: 120, width: 120 }} />, container);
    const banner = wrapper.queryByTestId('banner');
    expect(banner).toBeInTheDocument();
  });

  it('should render banner with particular height', () => {
    const wrapper = render(<TestComponent banner={{ url: 'tintup.com', height: 120, width: 120 }} />, container);
    const banner = wrapper.queryByTestId('banner');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveStyle({ height: '120px' });
  });
});

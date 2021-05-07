import React from 'react';
import { render } from '@testing-library/react';
import Footer from './footer';

jest.mock('./popup-circle', () => ({ LinkType: jest.fn() }));

describe('Test Footer Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <svg>
        <Footer font='lato' fontColor='red' position={{ x: 23, y: 23 }} time='' formatter={''} width={23} />
      </svg>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

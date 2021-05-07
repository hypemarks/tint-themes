import React from 'react';
import { render } from '@testing-library/react';
import Avatar from './avatar';

jest.mock('./popup-circle', () => ({ LinkType: jest.fn() }));

describe('Test Avatar Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <svg>
        <Avatar
          type='twitter'
          xCenterPosition={0}
          yCenterPosition={0}
          avatarCircleShift={{ x: 23, y: 23 }}
          iconCircleShift={{ x: 18, y: 18 }}
          iconShift={{ x: 12, y: 12 }}
        />
      </svg>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

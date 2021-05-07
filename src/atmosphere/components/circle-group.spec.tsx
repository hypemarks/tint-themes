import React from 'react';
import { render } from '@testing-library/react';
import CircleGroup from './circle-group';
import { buildPost } from '../../../test/generate';
import { IPostWithCTA } from '../../types/Post';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});
describe('Test CircleGroup Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <svg>
        <CircleGroup
          posts={[buildPost() as IPostWithCTA]}
          atmosphereBlipColors={[]}
          radius={23}
          xCenterPosition={2}
          yCenterPosition={3}
          circleGroupRef={jest.fn(() => ({})) as any}
        />
      </svg>
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

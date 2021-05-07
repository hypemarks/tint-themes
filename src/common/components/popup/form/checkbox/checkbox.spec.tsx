import { render } from '@testing-library/react';
import React from 'react';
import Checkbox from './checkbox';

describe('Test <Checkbox /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <Checkbox
        value={true}
        placeholder={'Click Me'}
        type={'Checkbox'}
        id={'id'}
        name={'check'}
        onBlur={jest.fn}
        onChange={jest.fn}
      />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});

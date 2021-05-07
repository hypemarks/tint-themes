import { render } from '@testing-library/react';
import React from 'react';
import RoundedButton from './rounded-button';

describe('Test <RoundedButton /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<RoundedButton onClick={jest.fn} radius={22} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render RoundedButton component with correct styles', () => {
    const radius = 22;
    const styles = { height: `${radius}px`, width: `${radius}px` };
    const wrapper = render(
      <RoundedButton onClick={jest.fn} radius={radius}>
        rounded-button
      </RoundedButton>
    );
    const button = wrapper.queryByText('rounded-button');
    expect(button).toHaveStyle(styles);
  });
});

import { render } from '@testing-library/react';
import React from 'react';
import useWindowSize from '../use-window-size';

const TestComponent = () => {
  const windowSize = useWindowSize();
  return <div data-testid='windowDiv' style={{ height: windowSize.height, width: windowSize.width }} />;
};

describe('Test useWindowSize Hook', () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('The style of component should be equal window sizes', () => {
    const style = { height: window.innerHeight + 'px', width: window.innerWidth + 'px' };
    const wrapper = render(<TestComponent />, container);
    const windowComponent = wrapper.queryByTestId('windowDiv');
    expect(windowComponent).toBeInTheDocument();
    expect(windowComponent).toHaveStyle(style);
  });
});

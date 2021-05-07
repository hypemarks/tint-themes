import * as React from 'react';
import SafeAnchor from '../safe-anchor/safe-anchor';
import './button.sass';

type ButtonTypes = 'submit' | 'button' | 'reset';

export interface IButtonProps {
  target?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<Element>) => void;
  onKeyPress?: (e: React.KeyboardEvent<Element>) => void;
  disabled?: boolean;
  type?: ButtonTypes;
  href?: string;
  tabIndex?: number;
  style?: { [key: string]: string };
}

export const Button: React.FC<IButtonProps> = ({
  children,
  target,
  disabled,
  type = 'button',
  className,
  tabIndex = 0,
  ...props
}) => {
  const classes = `${className ? className : ''} button`;

  if (props.href) {
    return (
      <SafeAnchor
        className={classes}
        tabIndex={tabIndex}
        style={{
          ...props.style,
        }}
        target={target}
        {...props}>
        {children}
      </SafeAnchor>
    );
  }

  return (
    <button
      className={classes}
      style={{
        ...props.style,
      }}
      disabled={disabled}
      tabIndex={tabIndex}
      type={type}
      data-testid={'button'}
      {...props}>
      {children}
    </button>
  );
};

export default Button;

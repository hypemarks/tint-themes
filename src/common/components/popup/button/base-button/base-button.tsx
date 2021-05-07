import classNames from 'classnames';
import React, { FC } from 'react';
import './base-button.sass';

type ButtonTypes = 'submit' | 'button' | 'reset';

const noop = () => ({});

export interface IBaseButtonProps {
  onClick?: () => void;
  type?: ButtonTypes;
  disabled?: false;
  customStyles?: { [key: string]: string | number | undefined };
  className?: string;
  primary?: boolean;
  extended?: boolean;
}

export const BaseButton: FC<IBaseButtonProps> = ({
  children,
  type = 'button',
  onClick = noop,
  disabled = false,
  customStyles,
  className,
  primary,
  extended,
}) => {
  const conditionalClassNames = classNames({
    'base-button--primary': primary,
    'base-button--extended': extended,
  });
  return (
    <button
      className={`base-button ${className} ${conditionalClassNames}`}
      style={customStyles}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={'base-button'}>
      {children}
    </button>
  );
};

export default BaseButton;

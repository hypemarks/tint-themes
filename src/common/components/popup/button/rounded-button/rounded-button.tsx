import React, { FC, memo } from 'react';
import BaseButton from '../base-button/base-button';
import './rounded-button.sass';

type ButtonTypes = 'submit' | 'button' | 'reset';

const noop = () => ({});

const typedMemo: <T>(c: T) => T = memo;

export interface IRoundedButtonProps {
  onClick?: () => void;
  type?: ButtonTypes;
  customStyles?: { [key: string]: string | number };
  radius: number;
  className?: string;
  primary?: boolean;
}

export const RoundedButton: FC<IRoundedButtonProps> = ({
  children,
  type = 'button',
  onClick = noop,
  customStyles,
  className,
  primary,
  radius,
}) => {
  return (
    <BaseButton
      className={`rounded-button ${className}`}
      customStyles={{ ...customStyles, height: radius, width: radius, borderRadius: radius }}
      onClick={onClick}
      type={type}
      primary={primary}>
      {children}
    </BaseButton>
  );
};

export default typedMemo(RoundedButton);

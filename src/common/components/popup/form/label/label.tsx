import React, { FC, memo } from 'react';

const typedMemo: <T>(c: T) => T = memo;
interface ILabelProps {
  id: string;
  label: string;
  className?: string;
}

const Label: FC<ILabelProps> = ({ children, id, label, className }) => (
  <label htmlFor={id} className={`${className}`}>
    {label}
    {children}
  </label>
);

export default typedMemo(Label);

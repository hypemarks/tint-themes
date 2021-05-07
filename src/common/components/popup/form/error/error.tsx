import React, { FC, memo } from 'react';
import './error.sass';
const typedMemo: <T>(c: T) => T = memo;

interface IErrorProps {
  show: boolean;
  message?: string;
  className?: string;
}

const Error: FC<IErrorProps> = ({ show, message, className }) =>
  show ? <div className={`error ${className}`}>{message}</div> : null;

export default typedMemo(Error);

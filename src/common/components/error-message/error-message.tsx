import React, { FC } from 'react';

const ErrorMessage: FC = () => {
  return (
    <div className='error-message' data-testid='error-message'>
      <h1>Something went wrong. Please contact support.</h1>
    </div>
  );
};

export default ErrorMessage;

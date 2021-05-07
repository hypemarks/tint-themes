import React, { FC } from 'react';
import './pagination.sass';
import Button from '../button/button';
export interface IPaginationProps {
  onNewContent?: () => void;
  fetchNextPage: (isPagination?: boolean) => void;
  fetchPrevPage: (isPagination?: boolean) => void;
}

export const Pagination: FC<IPaginationProps> = ({ onNewContent, fetchPrevPage, fetchNextPage }) => {
  const handlePreviousPage = () => {
    if (onNewContent) {
      onNewContent();
    }
    fetchPrevPage(true);
  };

  const handleNextPage = () => {
    if (onNewContent) {
      onNewContent();
    }
    fetchNextPage(true);
  };

  return (
    <>
      <Button onClick={handlePreviousPage} className='pagination'>
        Prev
      </Button>
      <Button onClick={handleNextPage} className='pagination'>
        Next
      </Button>
    </>
  );
};

export default Pagination;

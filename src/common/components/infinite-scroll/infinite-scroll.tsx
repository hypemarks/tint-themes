import React, { FC, useCallback, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import './infinite-scroll.sass';
import { IGetPostsReturnValue } from '../../../../../sdk/src';

interface IInfiniteScrollProps {
  fetchNextPage: () => Promise<{ payload: IGetPostsReturnValue }>;
  onNewContent?: () => void;
  isPostFetched?: boolean;
}

const InfiniteScroll: FC<IInfiniteScrollProps> = ({ fetchNextPage, onNewContent, isPostFetched = false }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(isPostFetched);

  const handleScroll = useCallback(() => {
    if (
      !isLoading &&
      document.documentElement.clientHeight + document.documentElement.scrollTop >
        Math.round(document.documentElement.scrollHeight * 0.75)
    ) {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchNextPage().then(data => {
      if (data && typeof data.payload.links.next === 'undefined') {
        setIsFetched(true);
      } else {
        onNewContent && onNewContent();
      }
      setIsLoading(false);
    });
  }, [isLoading]);

  useEffect(() => {
    isFetched && window.removeEventListener('scroll', handleScroll);
  }, [isFetched]);

  return (
    <div data-testid='infinite-scroll' className={`infinite-scroll ${isLoading && 'infinite-scroll--active'}`}>
      {isLoading && <Loader />}
    </div>
  );
};

export default InfiniteScroll;

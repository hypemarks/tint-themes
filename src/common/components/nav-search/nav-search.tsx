import React, { FC, useEffect, useRef, useState } from 'react';
import { IQueryParam } from '@tintup/tint-sdk';
import { debounce } from '../../../utils/function-utils';
import { globalConfig } from '../../config/config';
import './nav-search.sass';
import SourceIcon from '../source-icon/source-icon';
import { PostType } from '@tintup/tint-sdk/lib';

const delay = 200;

export interface INavSearchProps {
  handleOnNavSearch: (payload: IQueryParam) => void;
  navSearchColor: string;
}

const useDidMountEffect = (func: () => void, deps: string[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const NavSearch: FC<INavSearchProps> = ({ navSearchColor, handleOnNavSearch }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const throttled = useRef(
    debounce(async (q: string) => {
      handleOnNavSearch({ q });
    }, delay)
  );

  const handleFocus = () => setExpanded(true);
  const handleBlur = () => setExpanded(false);

  useDidMountEffect(() => throttled.current(query), [query]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <div
      tabIndex={0}
      role='button'
      className='nav-search'
      style={{ borderColor: navSearchColor }}
      aria-expanded={expanded}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      <div
        className='nav-search__item'
        style={{
          background: navSearchColor,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <SourceIcon
          type={'search' as PostType}
          color={globalConfig.icons.themes.navSearch.color}
          isNavItem={true}
          size='sm'
        />
      </div>
      <div
        className='nav-search__input-wrapper'
        style={{
          background: navSearchColor,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <label className='hide-element' htmlFor='query-search'>
          Search
        </label>
        <input
          id='query-search'
          name='query-search'
          className='nav-search__input'
          onChange={handleOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-testid={'search-input'}
        />
      </div>
    </div>
  );
};

export default NavSearch;

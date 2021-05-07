import React, { FC, useState } from 'react';
import { ISocialFeedsGroupedItem, IQueryParam, PostType } from '@tintup/tint-sdk/lib/';
import './nav-item.sass';
import { globalConfig } from '../../config/config';
import SourceIcon from '../source-icon/source-icon';

export interface INavItemProps {
  name: string;
  items?: readonly ISocialFeedsGroupedItem[];
  navItemColor: string;
  onClick: (payload: IQueryParam) => any;
}

export const NavItem: FC<INavItemProps> = ({ onClick, navItemColor, name, items }) => {
  const [expanded, setExpanded] = useState(false);

  const handleFocus = () => setExpanded(true);
  const handleBlur = () => setExpanded(false);

  const handleItemEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      callOnClick(event);
    }
  };

  const callOnClick = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.persist();
    event.stopPropagation();
    switch (name) {
      case 'home':
        onClick({});
        break;
      case 'externally_sourced_posts':
        onClick({ social_feed_id: items ? items.map(item => item.id) : [] });
        break;
      case 'exb_form':
        onClick({ social_feed_id: items ? items.map(item => item.id) : [] });
        break;
      default:
        onClick({ type: name });
    }
  };

  const handleListItemClick = (id: number, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.persist();
    event.stopPropagation();
    onClick({ social_feed_id: [id] });
  };

  const handleListItemEnter = (id: number, event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.keyCode === 13) {
      event.persist();
      event.stopPropagation();
      onClick({ social_feed_id: [id] });
    }
  };

  const socialsWithoutItemsList = ['custom'];
  return (
    <>
      <div
        className='nav-item'
        onClick={callOnClick}
        onKeyUp={handleItemEnter}
        style={{ borderColor: navItemColor }}
        role='button'
        aria-expanded={expanded}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        data-testid={'nav-item'}>
        <div
          className='nav-item__icon'
          data-testid={'nav-item-item'}
          style={{
            background: navItemColor,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <SourceIcon
            type={name as PostType}
            color={globalConfig.icons.themes.navItem.color}
            isNavItem={true}
            size='sm'
          />
        </div>
        {items &&
          items.length !== 0 &&
          items.some(item => item.name !== null) &&
          socialsWithoutItemsList.indexOf(name) < 0 && (
            <div className='nav-item__list-wrapper'>
              <ul
                className='nav-item__list'
                style={{
                  background: navItemColor,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}>
                {items.map(item =>
                  item.name !== null ? (
                    <li
                      tabIndex={0}
                      role='button'
                      key={item.id}
                      onKeyUp={handleListItemEnter.bind(null, item.id)}
                      onClick={handleListItemClick.bind(null, item.id)}
                      onFocus={handleFocus}
                      onBlur={handleBlur}>
                      {item.name}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
      </div>
    </>
  );
};

export default NavItem;

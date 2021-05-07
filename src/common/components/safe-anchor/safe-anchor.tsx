import * as React from 'react';

const isTrivialHref = (href?: string) => !href || href.trim() === '#';

interface ISafeAnchorProps {
  className: string;
  target?: string;
  disabled?: boolean;
  href?: string;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<Element>) => void;
  role?: string;
}

const SafeAnchor: React.FC<ISafeAnchorProps> = ({ children, tabIndex = 0, ...props }) => {
  const newProps: {
    target?: string;
    rel?: string;
    role?: string;
    href?: string;
    tabIndex?: number;
    'aria-disabled'?: boolean;
  } = {};

  const handleClick = (event: React.MouseEvent) => {
    const { href, onClick, disabled } = props;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick !== undefined) {
      onClick(event);
    }
  };

  if (isTrivialHref(props.href)) {
    newProps.role = props.role || 'button';
    newProps.href = props.href || '#';
  }

  if (props.disabled) {
    newProps.tabIndex = -1;
    newProps['aria-disabled'] = true;
  }

  if (props.target) {
    newProps.target = '_blank';
    newProps.rel = 'noopener noreferrer';
  }

  return (
    <a onClick={handleClick} tabIndex={tabIndex} {...props} {...newProps}>
      {children}
    </a>
  );
};

export default SafeAnchor;

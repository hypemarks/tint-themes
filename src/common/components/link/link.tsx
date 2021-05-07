import * as React from 'react';
import { Nullable } from '@tintup/tint-sdk/lib/';

interface LinkProps {
  href: string;
  ariaLabel?: string;
  hoverColor?: string;
  initialColor?: string;
  className?: string;
  tabIndex?: number;
  onClick?: (href: string) => Nullable<Window>;
}

const Link: React.FC<LinkProps> = ({
  className,
  href,
  ariaLabel,
  children,
  onClick,
  hoverColor,
  initialColor,
  tabIndex = 0,
}) => {
  const [color, setColor] = React.useState<string | undefined>(initialColor);
  const handleClick = () => {
    if (onClick) {
      onClick(href);
    }
  };

  const handleMouseLeave = () => {
    setColor(initialColor);
  };

  const handleMouseOver = () => {
    setColor(hoverColor);
  };

  return (
    <a
      className={className}
      href={href}
      aria-label={ariaLabel}
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleClick}
      style={{ color }}
      tabIndex={tabIndex}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      data-testid={'link'}>
      {children}
    </a>
  );
};

export default Link;

import React, {
  cloneElement,
  ReactNode,
  MouseEvent,
  ReactElement,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiIcon } from '../icon';

type ItemProps = CommonProps & {
  href?: string;
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
};

type EuiSideNavItemProps = ItemProps & {
  isOpen?: boolean;
  isSelected?: boolean;
  isParent?: boolean;
  icon?: ReactElement;
  items?: ReactNode;
  depth?: number;
  renderItem?: (props: ItemProps) => JSX.Element;
};

const DefaultRenderItem = ({
  href,
  onClick,
  className,
  children,
  ...rest
}: ItemProps) => {
  if (href) {
    return (
      <a className={className} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export const EuiSideNavItem = ({
  isOpen,
  isSelected,
  isParent,
  icon,
  onClick,
  href,
  items,
  children,
  depth = 0,
  renderItem: RenderItem = DefaultRenderItem,
  ...rest
}: EuiSideNavItemProps) => {
  let childItems;

  if (items && isOpen) {
    childItems = <div className="euiSideNavItem__items">{items}</div>;
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = cloneElement(icon, {
      className: 'euiSideNavItemButton__icon',
    });
  }

  const classes = classNames('euiSideNavItem', {
    'euiSideNavItem--root': depth === 0,
    'euiSideNavItem--rootIcon': depth === 0 && icon,
    'euiSideNavItem--trunk': depth === 1,
    'euiSideNavItem--branch': depth > 1,
    'euiSideNavItem--hasChildItems': !!childItems,
  });

  const buttonClasses = classNames('euiSideNavItemButton', {
    'euiSideNavItemButton--isClickable': onClick || href,
    'euiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'euiSideNavItemButton-isSelected': isSelected,
  });

  let caret;

  if (depth > 0 && isParent && !isOpen && !isSelected) {
    caret = <EuiIcon type="arrowDown" color="subdued" size="s" />;
  }

  const buttonContent = (
    <span className="euiSideNavItemButton__content">
      {buttonIcon}

      <span className="euiSideNavItemButton__label">{children}</span>

      {caret}
    </span>
  );

  return (
    <div className={classes}>
      <RenderItem
        href={href}
        onClick={onClick}
        className={buttonClasses}
        {...rest}>
        {buttonContent}
      </RenderItem>

      {childItems}
    </div>
  );
};

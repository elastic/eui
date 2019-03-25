import React, {
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

const defaultRenderItem = ({ href, onClick, className, children, ...rest }) => {
  if (href) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        role="menuitem"
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        role="menuitem"
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={className}
      aria-label={children}
      {...rest}
    >
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
  depth,
  renderItem = defaultRenderItem,
  ...rest,
}) => {
  let childItems;

  if (items && isOpen) {
    childItems = (
      <div className="euiSideNavItem__items">
        {items}
      </div>
    );
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
    'euiSideNavItem--hasChildItems': !!childItems
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

      <span className="euiSideNavItemButton__label">
        {children}
      </span>

      {caret}
    </span>
  );

  return (
    <div className={classes}>
      {renderItem({ href, onClick, className: buttonClasses, children: buttonContent, ...rest })}
      {childItems}
    </div>
  );
};

EuiSideNavItem.propTypes = {
  isOpen: PropTypes.bool,
  isSelected: PropTypes.bool,
  isParent: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
  items: PropTypes.node,
  children: PropTypes.node,
  depth: PropTypes.number,
  renderItem: PropTypes.func,
};

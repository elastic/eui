import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '..';

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
  ...rest,
}) => {
  let childItems;

  if (isOpen) {
    childItems = (
      <div className="euiSideNavItem__items">
        {items}
      </div>
    );
  }

  let buttonIcon;

  if (icon) {
    buttonIcon = (
      <EuiFlexItem isInline grow={false}>
        {icon}
      </EuiFlexItem>
    );
  }

  const classes = classNames('euiSideNavItem', {
    'euiSideNavItem--root': depth === 0,
    'euiSideNavItem--hasIcon': depth === 0 && icon,
    'euiSideNavItem--deep': depth > 1,
  });

  const buttonClasses = classNames('euiSideNavItemButton', {
    'euiSideNavItemButton--root': depth === 0,
    'euiSideNavItemButton--trunk': depth === 1,
    'euiSideNavItemButton--deep': depth > 1,
    'euiSideNavItemButton--parent': depth > 0 && isParent,
    'euiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'euiSideNavItemButton-isSelected': isSelected,
  });

  const buttonContent = (
    <EuiFlexGroup
      isInline
      gutterSize="s"
      alignItems="center"
      responsive={false}
    >
      {buttonIcon}

      <EuiFlexItem
        isInline
        grow={false}
        className="euiSideNavItemButton__labelContainer"
      >
        <span
          className="euiSideNavItemButton__label"
        >
          {children}
        </span>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  let button;

  if (href) {
    button = (
      <a
        className={buttonClasses}
        href={href}
      >
        {buttonContent}
      </a>
    );
  } else {
    button = (
      <button
        className={buttonClasses}
        onClick={onClick}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <div className={classes} {...rest}>
      {button}
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
};

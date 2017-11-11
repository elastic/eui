import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '..';

const EuiSideNavItem = ({
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

export class EuiSideNav extends Component {
  isItemOpen = item => {
    // Of course a selected item is open.
    if (item.isSelected) {
      return true;
    }

    // The item has to be open if it has a child that's open.
    if (item.items) {
      return item.items.some(this.isItemOpen);
    }
  };

  renderTree = (items, depth = 0) => {
    return items.map((item) => {
      const {
        id,
        name,
        isSelected,
        items: childItems,
        icon,
        onClick,
        href,
      } = item;

      // Root items are always open.
      const isOpen = depth === 0 ? true : this.isItemOpen(item);

      let renderedItems;

      if (childItems) {
        renderedItems = this.renderTree(childItems, depth + 1);
      }

      return (
        <EuiSideNavItem
          isOpen={isOpen}
          isSelected={isSelected}
          isParent={!!childItems}
          icon={icon}
          onClick={onClick}
          href={href}
          items={renderedItems}
          key={id}
          depth={depth}
        >
          {name}
        </EuiSideNavItem>
      );
    });
  };

  render() {
    const {
      className,
      items,
      toggleOpenOnMobile,
      isOpenOnMobile,
      mobileTitle,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSideNav',
      className,
      {
        'euiSideNav-isOpenMobile': isOpenOnMobile,
      },
    );

    const nav = this.renderTree(items);

    return (
      <nav
        className={classes}
        {...rest}
      >
        {/* Hidden from view, except in mobile */}
        <button
          type="button"
          className="euiSideNav__mobileToggle euiLink"
          onClick={toggleOpenOnMobile}
        >
          <span className="euiSideNav__mobileWrap">
            <span className="euiSideNav__mobileTitle">
              {mobileTitle}
            </span>

            <EuiIcon
              className="euiSideNav__mobileIcon"
              type="apps"
              size="m"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Hidden from view in mobile, but toggled from the button above */}
        <div className="euiSideNav__content">
          {nav}
        </div>
      </nav>
    );
  }
}

EuiSideNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  toggleOpenOnMobile: PropTypes.func,
  isOpenOnMobile: PropTypes.bool,
  mobileTitle: PropTypes.node,
  items: PropTypes.array,
};

EuiSideNav.defaultProps = {
  items: [],
};

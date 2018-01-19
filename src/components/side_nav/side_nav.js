import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

import {
  EuiSideNavItem,
} from './side_nav_item';

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
    const { renderItem } = this.props;

    return items.map((item) => {
      const {
        id,
        name,
        isSelected,
        items: childItems,
        icon,
        onClick,
        href,
        ...rest
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
          renderItem={renderItem}
          {...rest}
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
      // Extract this one out so it isn't passed to <nav>
      renderItem, // eslint-disable-line no-unused-vars
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
  renderItem: PropTypes.func,
};

EuiSideNav.defaultProps = {
  items: [],
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../icon';

import { EuiSideNavItem } from './side_nav_item';

export class EuiSideNav extends Component {
  isItemOpen = item => {
    // The developer can force the item to be open.
    if (item.forceOpen) {
      return true;
    }

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

    return items.map(item => {
      const {
        id,
        name,
        isSelected,
        items: childItems,
        icon,
        onClick,
        href,
        forceOpen, // eslint-disable-line no-unused-vars
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
          {...rest}>
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

    const classes = classNames('euiSideNav', className, {
      'euiSideNav-isOpenMobile': isOpenOnMobile,
    });

    const nav = this.renderTree(items);

    return (
      <nav className={classes} {...rest}>
        {/* Hidden from view, except in mobile */}
        <button
          type="button"
          className="euiSideNav__mobileToggle euiLink"
          onClick={toggleOpenOnMobile}>
          <span className="euiSideNav__mobileWrap">
            <span className="euiSideNav__mobileTitle">{mobileTitle}</span>

            <EuiIcon
              className="euiSideNav__mobileIcon"
              type="apps"
              size="m"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Hidden from view in mobile, but toggled from the button above */}
        <div className="euiSideNav__content" role="menubar">
          {nav}
        </div>
      </nav>
    );
  }
}

EuiSideNav.propTypes = {
  /**
   * `children` are not rendered. Use `items` to specify navigation items instead.
   */
  children: PropTypes.node,
  /**
   * Class names to be merged into the final `className` property.
   */
  className: PropTypes.string,
  /**
   * When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.
   */
  toggleOpenOnMobile: PropTypes.func,
  /**
   * If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.
   */
  isOpenOnMobile: PropTypes.bool,
  /**
   * A React node to render at mobile responsive widths, representing the title of this navigation menu.
   */
  mobileTitle: PropTypes.node,
  /**
   * `items` is an array of objects (navigation menu `item`s).
   * Each `item` may contain the following properties (this is an incomplete list):
   * `item.id` is a required value that is passed to React as the `key` for this item
   * `item.forceOpen` is an optional boolean; if set to true it will force the item to display in an "open" state at all times.
   * `item.href` is an optional string to be passed as the navigation item's `href` prop, and by default it will force rendering of the item as an `<a>`.
   * `item.icon` is an optional React node which will be rendered as a small icon to the left of the navigation item text.
   * `item.isSelected` is an optional boolean; if set to true it will render the item in a visible "selected" state, and will force all ancestor navigation items to render in an "open" state.
   * `item.items` is an optional array containing additional item objects, representing nested children of this navigation item.
   * `item.name` is a required React node representing the text to render for this item (usually a string will suffice).
   * `item.onClick` is an optional callback function to be passed as the navigation item's `onClick` prop, and by default it will force rendering of the item as a `<button>` instead of a link.
   * `item.renderItem` is an optional function overriding default rendering for this navigation item — when called, it should return a React node representing a replacement navigation item.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired,
      ]).isRequired,
    }).isRequired
  ),
  /**
   * Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.
   */
  renderItem: PropTypes.func,
};

EuiSideNav.defaultProps = {
  items: [],
};

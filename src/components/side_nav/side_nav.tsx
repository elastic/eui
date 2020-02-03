import React, {
  Component,
  ReactNode,
  MouseEvent,
  ReactElement,
  ComponentProps,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiIcon } from '../icon';

import { EuiSideNavItem } from './side_nav_item';

interface Item {
  /**
   * A value that is passed to React as the `key` for this item
   */
  id: string | number;
  /**
   * If set to true it will force the item to display in an "open" state at all times.
   */
  forceOpen?: boolean;
  /**
   * Is an optional string to be passed as the navigation item's `href` prop, and by default it will force rendering of the item as an `<a>`.
   */
  href?: string;
  /**
   * React node which will be rendered as a small icon to the left of the navigation item text.
   */
  icon?: ReactElement;
  /**
   * If set to true it will render the item in a visible "selected" state, and will force all ancestor navigation items to render in an "open" state.
   */
  isSelected?: boolean;
  /**
   * Array containing additional item objects, representing nested children of this navigation item.
   */
  items?: Item[];
  /**
   * React node representing the text to render for this item (usually a string will suffice).
   */
  name: ReactNode;
  /**
   * Callback function to be passed as the navigation item's `onClick` prop, and by default it will force rendering of the item as a `<button>` instead of a link.
   */
  onClick?: (e: MouseEvent) => void;
  /**
   * Function overriding default rendering for this navigation item — when called, it should return a React node representing a replacement navigation item.
   */
  renderItem?: ComponentProps<typeof EuiSideNavItem>['renderItem'];
}

interface EuiSideNavProps extends CommonProps {
  children?: ReactNode;
  /**
   * Class names to be merged into the final `className` property.
   */
  className?: string;
  /**
   * When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.
   */
  toggleOpenOnMobile?: (e: MouseEvent) => void;
  /**
   * If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.
   */
  isOpenOnMobile?: boolean;
  /**
   * A React node to render at mobile responsive widths, representing the title of this navigation menu.
   */
  mobileTitle?: ReactNode;
  /**
   * `items` is an array of objects (navigation menu `item`s).
   */
  items: Item[];
  /**
   * Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.
   */
  renderItem?: ComponentProps<typeof EuiSideNavItem>['renderItem'];
}

export class EuiSideNav extends Component<EuiSideNavProps> {
  static defaultProps = {
    items: [],
  };

  isItemOpen = (item: Item) => {
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

    return false;
  };

  renderTree = (items: Item[], depth = 0) => {
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
        forceOpen,
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
      renderItem,
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
        <div className="euiSideNav__content">{nav}</div>
      </nav>
    );
  }
}

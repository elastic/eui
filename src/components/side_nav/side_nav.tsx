/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiSideNavItem, RenderItem } from './side_nav_item';
import { EuiSideNavItemType } from './side_nav_types';
import { EuiButtonEmpty } from '../button';

export type EuiSideNavProps<T = {}> = T &
  CommonProps & {
    /**
     * `children` are not rendered. Use `items` to specify navigation items instead.
     */
    children?: never;
    /**
     * Class names to be merged into the final `className` property.
     */
    className?: string;
    /**
     * When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.
     */
    toggleOpenOnMobile?: MouseEventHandler<HTMLButtonElement>;
    /**
     * If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.
     */
    isOpenOnMobile?: boolean;
    /**
     * A React node to render at mobile responsive widths, representing the title of this navigation menu.
     */
    mobileTitle?: ReactNode;
    /**
     *  An array of #EuiSideNavItem objects. Lists navigation menu items.
     */
    items: Array<EuiSideNavItemType<T>>;
    /**
     * Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.
     */
    renderItem?: RenderItem<T>;
    /**
     * Truncates the text of all items to stick to a single line
     */
    truncate?: boolean;
  };

export class EuiSideNav<T> extends Component<EuiSideNavProps<T>> {
  static defaultProps = {
    items: [],
  };

  isItemOpen = (item: EuiSideNavItemType<T>) => {
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

  renderTree = (items: Array<EuiSideNavItemType<T>>, depth = 0) => {
    const { renderItem, truncate } = this.props;

    return items.map((item) => {
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
          truncate={truncate}
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
      truncate,
      ...rest
    } = this.props;

    const classes = classNames('euiSideNav', className, {
      'euiSideNav-isOpenMobile': isOpenOnMobile,
    });

    const nav = this.renderTree(items);

    return (
      <nav className={classes} {...rest}>
        {/* Hidden from view, except in mobile */}
        <EuiButtonEmpty
          className="euiSideNav__mobileToggle"
          onClick={toggleOpenOnMobile}
          iconType="apps"
          iconSide="right">
          {mobileTitle}
        </EuiButtonEmpty>

        {/* Hidden from view in mobile, but toggled from the button above */}
        <div className="euiSideNav__content">{nav}</div>
      </nav>
    );
  }
}

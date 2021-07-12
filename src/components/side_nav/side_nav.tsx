/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { EuiSideNavItem, RenderItem } from './side_nav_item';
import { EuiSideNavItemType } from './side_nav_types';
import { EuiButtonEmpty } from '../button';
import { EuiTitle, EuiTitleProps } from '../title';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiBreakpointSize, htmlIdGenerator } from '../../services';
import { EuiHideFor, EuiShowFor } from '../responsive';

export type EuiSideNavHeadingProps = Partial<EuiTitleProps> & {
  /**
   * The actual HTML heading element to wrap the `heading`.
   * Default is `h2`
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  /**
   * For best accessibility, `<nav>` elements should have a nested heading. But you can hide this element if it's redundent from something else (except on mobile).
   */
  screenReaderOnly?: boolean;
};

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
     * Creates an associated heading element and uses the same node as default for `mobileTitle`
     */
    heading?: ReactNode;
    /**
     * Adds a couple extra #EuiSideNavHeading props and extends the props of EuiTitle that wraps the `heading`
     */
    headingProps?: EuiSideNavHeadingProps;
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
     * Array of breakpoint names for when to show the mobile version.
     * Set to `undefined` to remove responsive behavior
     */
    mobileBreakpoints?: EuiBreakpointSize[];
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
    mobileBreakpoints: ['xs', 's'],
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

      // Act as an accordion only if item is not linked but has children (and not the root)
      const childrenOnly = depth > 0 && !onClick && !href && !!childItems;

      return (
        <EuiSideNavItem
          isOpen={isOpen}
          isSelected={!childrenOnly && isSelected}
          isParent={!!childItems}
          icon={icon}
          onClick={onClick}
          href={href}
          items={renderedItems}
          key={id}
          depth={depth}
          renderItem={renderItem}
          truncate={truncate}
          childrenOnly={childrenOnly}
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
      mobileBreakpoints,
      // Extract this one out so it isn't passed to <nav>
      renderItem,
      truncate,
      heading,
      headingProps = {},
      ...rest
    } = this.props;

    const classes = classNames('euiSideNav', className, {
      'euiSideNav-isOpenMobile': isOpenOnMobile,
    });

    // To support the extra CSS needed to show/hide/animate the content,
    // We add a className for every breakpoint supported
    const contentClasses = classNames(
      'euiSideNav__content',
      mobileBreakpoints?.map(
        (breakpointName) => `euiSideNav__contentMobile-${breakpointName}`
      )
    );
    const sideNavContentId = htmlIdGenerator('euiSideNavContent')();
    const navContent = (
      <div id={sideNavContentId} className={contentClasses}>
        {this.renderTree(items)}
      </div>
    );

    const {
      screenReaderOnly: headingScreenReaderOnly = false,
      element: HeadingElement = 'h2',
      ...titleProps
    } = headingProps!;

    const hasMobileVersion = mobileBreakpoints && mobileBreakpoints.length > 0;
    const hasHeader = !!heading;
    let headingNode;

    const sharedHeadingProps = {
      id: headingProps?.id || htmlIdGenerator('euiSideNavHeading')(),
      className: headingProps?.className,
      'data-test-subj': headingProps?.['data-test-subj'],
      'aria-label': headingProps?.['aria-label'],
    };

    if (hasHeader) {
      headingNode = (
        <HeadingElement {...sharedHeadingProps}>{heading}</HeadingElement>
      );

      if (headingScreenReaderOnly) {
        headingNode = <EuiScreenReaderOnly>{headingNode}</EuiScreenReaderOnly>;
      } else {
        headingNode = (
          <EuiTitle
            size="xs"
            {...titleProps}
            className={classNames(
              'euiSideNav__heading',
              headingProps?.className
            )}>
            <HeadingElement {...sharedHeadingProps}>{heading}</HeadingElement>
          </EuiTitle>
        );
      }
    }

    let mobileNode;
    const breakpoints: EuiBreakpointSize[] | undefined = mobileBreakpoints;
    if (hasMobileVersion) {
      mobileNode = (
        <EuiShowFor sizes={breakpoints || 'none'}>
          <nav
            aria-labelledby={sharedHeadingProps.id}
            className={classes}
            {...rest}>
            <HeadingElement {...sharedHeadingProps}>
              <EuiButtonEmpty
                className="euiSideNav__mobileToggle"
                textProps={{ className: 'euiSideNav__mobileToggleText' }}
                contentProps={{
                  className: 'euiSideNav__mobileToggleContent',
                }}
                onClick={toggleOpenOnMobile}
                iconType="apps"
                iconSide="right"
                aria-controls={sideNavContentId}
                aria-expanded={isOpenOnMobile}>
                {mobileTitle || heading}
              </EuiButtonEmpty>
            </HeadingElement>
            {navContent}
          </nav>
        </EuiShowFor>
      );
    }

    return (
      <>
        {mobileNode}
        <EuiHideFor sizes={breakpoints || 'none'}>
          <nav
            aria-labelledby={headingNode ? sharedHeadingProps.id : undefined}
            className={classes}
            {...rest}>
            {headingNode}
            {navContent}
          </nav>
        </EuiHideFor>
      </>
    );
  }
}

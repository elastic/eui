/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { CommonProps, PropsOf } from '../common';
import { EuiButtonEmpty } from '../button';
import { EuiI18n } from '../i18n';
import {
  EuiBreakpointSize,
  htmlIdGenerator,
  withEuiTheme,
  WithEuiThemeProps,
} from '../../services';
import { EuiHideFor, EuiShowFor } from '../responsive';

import { EuiSideNavHeading, EuiSideNavHeadingProps } from './_side_nav_heading';
import { EuiSideNavItem, RenderItem } from './side_nav_item';
import { EuiSideNavItemType } from './side_nav_types';
import { euiSideNavMobileStyles } from './side_nav.styles';

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
     * Adds a couple extra {@link EuiSideNavHeading} props and extends the props of EuiTitle that wraps the `heading`
     */
    headingProps?: Partial<EuiSideNavHeadingProps>;
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
     *  An array of {@link EuiSideNavItem} objects. Lists navigation menu items.
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

export class EuiSideNavClass<T> extends Component<
  EuiSideNavProps<T> & WithEuiThemeProps
> {
  generateId = htmlIdGenerator('euiSideNav');

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
          renderItem={
            renderItem as PropsOf<typeof EuiSideNavItem>['renderItem']
          }
          truncate={truncate}
          childrenOnly={childrenOnly}
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
      mobileBreakpoints,
      // Extract this one out so it isn't passed to <nav>
      renderItem,
      truncate,
      heading,
      headingProps,
      theme,
      ...rest
    } = this.props;

    const classes = classNames('euiSideNav', className, {
      'euiSideNav-isOpenMobile': isOpenOnMobile,
    });
    const styles = euiSideNavMobileStyles(theme);

    const contentClasses = classNames('euiSideNav__content');
    const sideNavContentId = this.generateId('content');
    const mobileContentStyles = [
      styles.content.euiSideNav__mobileContent,
      isOpenOnMobile ? styles.content.open : styles.content.hidden,
    ];

    const hasMobileVersion = mobileBreakpoints && mobileBreakpoints.length > 0;
    const mobileToggleText = mobileTitle || heading;
    const mobileHeadingUnset = {
      marginBlockEnd: 0,
      label: 'mobile',
    };

    const headingId = headingProps?.id || this.generateId('heading');
    const headingScreenReaderOnly = !!headingProps?.screenReaderOnly;

    return (
      <>
        {hasMobileVersion && (
          <EuiShowFor sizes={mobileBreakpoints || 'none'}>
            <nav aria-labelledby={headingId} className={classes} {...rest}>
              <EuiSideNavHeading
                id={headingId}
                {...headingProps}
                screenReaderOnly={false}
                css={mobileHeadingUnset}
              >
                <EuiI18n
                  token="euiSideNav.mobileToggleAriaLabel"
                  default="Toggle navigation"
                >
                  {(mobileToggleAriaLabel: string) => (
                    <EuiButtonEmpty
                      className="euiSideNav__mobileToggle"
                      css={styles.euiSideNav__mobileToggle}
                      contentProps={{
                        className: 'euiSideNav__mobileToggleContent',
                        css: styles.euiSideNav__mobileToggleContent,
                      }}
                      onClick={toggleOpenOnMobile}
                      iconType="apps"
                      iconSide="right"
                      aria-controls={sideNavContentId}
                      aria-expanded={isOpenOnMobile}
                      aria-label={
                        !mobileToggleText || headingScreenReaderOnly
                          ? mobileToggleAriaLabel
                          : undefined
                      }
                    >
                      {!headingScreenReaderOnly && mobileToggleText}
                    </EuiButtonEmpty>
                  )}
                </EuiI18n>
              </EuiSideNavHeading>
              <div
                id={sideNavContentId}
                className={contentClasses}
                css={mobileContentStyles}
              >
                {this.renderTree(items)}
              </div>
            </nav>
          </EuiShowFor>
        )}
        <EuiHideFor sizes={mobileBreakpoints || 'none'}>
          <nav
            aria-labelledby={heading ? headingId : undefined}
            className={classes}
            {...rest}
          >
            {heading && (
              <EuiSideNavHeading id={headingId} {...headingProps}>
                {heading}
              </EuiSideNavHeading>
            )}
            <div id={sideNavContentId} className={contentClasses}>
              {this.renderTree(items)}
            </div>
          </nav>
        </EuiHideFor>
      </>
    );
  }
}

export const EuiSideNav = withEuiTheme<EuiSideNavProps>(EuiSideNavClass);

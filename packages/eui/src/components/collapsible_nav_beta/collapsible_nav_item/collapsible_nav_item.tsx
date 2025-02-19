/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';

import { EuiIcon, IconType, EuiIconProps } from '../../icon';
import { EuiLinkProps } from '../../link';
import { EuiAccordionProps } from '../../accordion';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsedNavItem } from './collapsed';
import { EuiCollapsibleNavAccordion } from './collapsible_nav_accordion';
import { EuiCollapsibleNavGroup } from './collapsible_nav_group';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';
import {
  euiCollapsibleNavTopItemStyles,
  euiCollapsibleNavItemTitleStyles,
  euiCollapsibleNavSubItemsStyles,
} from './collapsible_nav_item.styles';

export type _SharedEuiCollapsibleNavItemProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * Highlights whether an item is currently selected, e.g.
     * if the user is on the same page as the nav link
     */
    isSelected?: boolean;
  };

export type EuiCollapsibleNavItemProps = _SharedEuiCollapsibleNavItemProps &
  ExclusiveUnion<
    {
      /**
       * Required text to render as the nav item title
       */
      title: string;
      /**
       * Allows customizing the title element.
       * Consider using a heading element for better accessibility.
       * Defaults to an unsemantic `span` or `div`, depending on context.
       */
      titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
      /**
       * Optional icon to render to the left of title content
       */
      icon?: IconType;
      /**
       * Optional props to pass to the title icon
       */
      iconProps?: Partial<EuiIconProps>;
    },
    {}
  > &
  ExclusiveUnion<
    {
      /**
       * The nav item link.
       *
       * If not included, and no `onClick` is specified, the nav item
       * will render as an non-interactive `<span>`.
       *
       * Should not be used together with `items`, as the title will
       * trigger the accordion collapse/expand action instead of a link.
       */
      href?: string;
      /**
       * If a `href` is specified, use this prop to pass any prop that `EuiLink` accepts
       */
      linkProps?: Partial<EuiLinkProps>;
    },
    {
      /**
       * Will render either an accordion or group of nested child item links.
       *
       * Accepts any #EuiCollapsibleNavItemProps. Or, to render completely custom
       * subitem content, pass an object with a `renderItem` callback.
       */
      items: EuiCollapsibleNavSubItemProps[];
      /**
       * If set to false, will (visually) render an always-open accordion that cannot
       * be toggled closed. Ignored if `items` is not passed.
       *
       * @default true
       */
      isCollapsible?: boolean;
      /**
       * If `items` is specified, and `isCollapsible` is not set to false, you may
       * use this prop to pass any prop that `EuiAccordion` accepts, including props
       * that control the toggled state of the accordion (e.g. `initialIsOpen`, `forceState`)
       */
      accordionProps?: Partial<EuiAccordionProps>;
    }
  >;

export type EuiCollapsibleNavCustomSubItem = {
  renderItem: (options: {
    /**
     * When the side nav is collapsed on larger screens, the menu appears in an EuiPopover.
     * When the sidenav is collapsed on smaller screens, the menu appears in an EuiFlyout.
     *
     * Use this handler to close either the portalled flyout or popover, depending on which is present.
     * If the handler is not defined, it means there is no portal onscreen to close.
     */
    closePortals?: MouseEventHandler;
  }) => ReactNode;
};

export type EuiCollapsibleNavSubItemProps = ExclusiveUnion<
  EuiCollapsibleNavItemProps,
  EuiCollapsibleNavCustomSubItem
>;

export type _EuiCollapsibleNavItemDisplayProps = {
  /**
   * Determines whether the item should render as a top-level nav item
   * or a nested nav subitem. Set internally by EUI
   */
  isSubItem?: boolean;
};

/**
 * Internal DRY subcomponent shared between top level items and sub items
 * that handles title display/rendering, and can be used to recursively
 * determine whether to render an accordion or a link
 */
const EuiCollapsibleNavItemDisplay: FunctionComponent<
  EuiCollapsibleNavItemProps & _EuiCollapsibleNavItemDisplayProps
> = ({
  isSubItem,
  title,
  titleElement,
  icon,
  iconProps,
  href, // eslint-disable-line local/href-with-rel
  linkProps,
  items,
  isCollapsible = true,
  accordionProps,
  children, // Ensure children isn't spread
  ...props
}) => {
  const headerContent = title != null && (
    <EuiCollapsibleNavItemTitle
      title={title}
      titleElement={titleElement}
      icon={icon}
      iconProps={iconProps}
    />
  );

  if (items) {
    if (title != null && isCollapsible) {
      return (
        <EuiCollapsibleNavAccordion
          buttonContent={headerContent}
          items={items}
          accordionProps={accordionProps}
          {...props}
          isSubItem={isSubItem}
        />
      );
    } else {
      return (
        <EuiCollapsibleNavGroup
          header={headerContent}
          items={items}
          {...props}
          isSubItem={isSubItem}
        />
      );
    }
  }

  return (
    <EuiCollapsibleNavLink
      href={href}
      linkProps={linkProps}
      {...(props as EuiLinkProps)} // EuiLink ExclusiveUnion type shenanigans
      isSubItem={isSubItem}
      isNotAccordion
      isInteractive={!!(href || props.onClick || linkProps?.onClick)}
    >
      {headerContent}
    </EuiCollapsibleNavLink>
  );
};

/**
 * Internal subcomponent for title display
 */
export const EuiCollapsibleNavItemTitle: FunctionComponent<
  Pick<
    EuiCollapsibleNavItemProps,
    'title' | 'titleElement' | 'icon' | 'iconProps'
  >
> = ({ title, titleElement = 'span', icon, iconProps }) => {
  const styles = euiCollapsibleNavItemTitleStyles;
  const TitleElement = titleElement;

  return (
    <>
      {icon && (
        <EuiIcon
          type={icon}
          {...iconProps}
          className={classNames(
            'euiCollapsibleNavItem__icon',
            iconProps?.className
          )}
        />
      )}

      <TitleElement
        className="euiCollapsibleNavItem__title"
        css={styles.euiCollapsibleNavItem__title}
      >
        {title}
      </TitleElement>
    </>
  );
};

/**
 * Sub-items can either be a totally custom rendered item,
 * or they can simply be more links or accordions
 */
export const EuiCollapsibleNavSubItem: FunctionComponent<
  EuiCollapsibleNavSubItemProps
> = ({ renderItem, className, ...props }) => {
  const classes = classNames('euiCollapsibleNavSubItem', className);
  const { closePortals } = useContext(EuiCollapsibleNavContext);

  if (renderItem) {
    return <>{renderItem({ closePortals })}</>;
  }

  return (
    <EuiCollapsibleNavItemDisplay
      className={classes}
      {...(props as EuiCollapsibleNavItemProps)}
      isSubItem
    />
  );
};

/**
 * Reuseable component for rendering a group of sub items
 * Used by both `EuiCollapsibleNavGroup` and `EuiCollapsibleNavAccordion`
 */
type EuiCollapsibleNavSubItemsProps = HTMLAttributes<HTMLDivElement> &
  _EuiCollapsibleNavItemDisplayProps & {
    items: EuiCollapsibleNavSubItemProps[];
  };
export const EuiCollapsibleNavSubItems: FunctionComponent<
  EuiCollapsibleNavSubItemsProps
> = ({ items, isSubItem, className, ...rest }) => {
  const classes = classNames('euiCollapsibleNavItem__items', className);

  const styles = useEuiMemoizedStyles(euiCollapsibleNavSubItemsStyles);
  const cssStyles = [
    styles.euiCollapsibleNavItem__items,
    isSubItem ? styles.isSubItem : styles.isTopItem,
  ];

  const itemsHaveIcons = useMemo(
    () => items.some((item) => !!item.icon),
    [items]
  );

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {items.map((item, index) => {
        // If any of the sub items have an icon, default to an
        // icon of `empty` so that all text lines up vertically
        if (!item.renderItem && itemsHaveIcons && !item.icon) {
          item.icon = 'empty';
        }
        return (
          // This is an intentional circular dependency between the accordion & parent item display.
          // EuiSideNavItem is purposely recursive to support any amount of nested sub items,
          // and split up into separate files/components for better dev readability
          <EuiCollapsibleNavSubItem key={index} {...item} />
        );
      })}
    </div>
  );
};

/**
 * The actual exported component
 */

export const EuiCollapsibleNavItem: FunctionComponent<
  EuiCollapsibleNavItemProps
> = ({ className, ...props }) => {
  const classes = classNames('euiCollapsibleNavItem', className);
  const styles = useEuiMemoizedStyles(euiCollapsibleNavTopItemStyles);

  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);

  return isCollapsed && isPush ? (
    <EuiCollapsedNavItem className={classes} {...props} />
  ) : (
    <EuiCollapsibleNavItemDisplay
      className={classes}
      {...props}
      css={styles.euiCollapsibleNavTopItem}
      isSubItem={false}
    />
  );
};

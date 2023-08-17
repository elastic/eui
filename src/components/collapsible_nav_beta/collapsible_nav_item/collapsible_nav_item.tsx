/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { CommonProps, ExclusiveUnion } from '../../common';

import { EuiIcon, IconType, EuiIconProps } from '../../icon';
import { EuiLinkProps } from '../../link';
import { EuiAccordionProps } from '../../accordion';
import { EuiTitle } from '../../title';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsedNavItem } from './collapsed';
import { EuiCollapsibleNavAccordion } from './collapsible_nav_accordion';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';
import {
  euiCollapsibleNavItemTitleStyles,
  euiCollapsibleNavSubItemGroupTitleStyles,
} from './collapsible_nav_item.styles';

export type _SharedEuiCollapsibleNavItemProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * The nav item link.
     * If not included, and no `onClick` is specified, the nav item
     * will render as an non-interactive `<span>`.
     */
    href?: string;
    /**
     * When passed, an `EuiAccordion` with nested child item links will be rendered.
     *
     * Accepts any #EuiCollapsibleNavItem prop, and also accepts an
     * #EuiCollapsibleNavSubItemGroupTitle
     */
    items?: EuiCollapsibleNavSubItemProps[];
    /**
     * If `items` is specified, use this prop to pass any prop that `EuiAccordion`
     * accepts, including props that control the toggled state of the accordion
     * (e.g. `initialIsOpen`, `forceState`)
     */
    accordionProps?: Partial<EuiAccordionProps>;
    /**
     * If a `href` is specified, use this prop to pass any prop that `EuiLink` accepts
     */
    linkProps?: Partial<EuiLinkProps>;
    /**
     * Highlights whether an item is currently selected, e.g.
     * if the user is on the same page as the nav link
     */
    isSelected?: boolean;
  };

export type EuiCollapsibleNavItemProps = {
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
} & _SharedEuiCollapsibleNavItemProps;

export type EuiCollapsibleNavSubItemGroupTitle = Pick<
  EuiCollapsibleNavItemProps,
  'title' | 'titleElement'
> & {
  /**
   * Pass this flag to seperate links by group title headings.
   * Strongly consider using the `titleElement` prop for accessibility.
   */
  isGroupTitle?: boolean;
};

export type EuiCollapsibleNavSubItemProps = ExclusiveUnion<
  EuiCollapsibleNavItemProps,
  EuiCollapsibleNavSubItemGroupTitle
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
  items,
  children, // Ensure children isn't spread
  ...props
}) => {
  const headerContent = (
    <EuiCollapsibleNavItemTitle
      title={title}
      titleElement={titleElement}
      icon={icon}
      iconProps={iconProps}
    />
  );

  const isAccordion = items && items.length > 0;
  if (isAccordion) {
    return (
      <EuiCollapsibleNavAccordion
        buttonContent={headerContent}
        items={items}
        {...props}
        isSubItem={isSubItem}
      />
    );
  }

  return (
    <EuiCollapsibleNavLink
      {...(props as EuiLinkProps)} // EuiLink ExclusiveUnion type shenanigans
      isSubItem={isSubItem}
      isNotAccordion
      isInteractive={
        !!(props.href || props.onClick || props.linkProps?.onClick)
      }
    >
      {headerContent}
    </EuiCollapsibleNavLink>
  );
};

/**
 * Internal subcomponent for title display
 */
const EuiCollapsibleNavItemTitle: FunctionComponent<
  Pick<
    EuiCollapsibleNavItemProps,
    'title' | 'titleElement' | 'icon' | 'iconProps'
  >
> = ({ title, titleElement = 'span', icon, iconProps }) => {
  const styles = euiCollapsibleNavItemTitleStyles;
  const TitleElement = titleElement;

  return (
    <>
      {icon && <EuiIcon type={icon} {...iconProps} />}

      <TitleElement
        className="euiCollapsibleNavItem__title eui-textTruncate"
        css={styles.euiCollapsibleNavItem__title}
      >
        {title}
      </TitleElement>
    </>
  );
};

/**
 * Sub-items can either be a group title, to visually separate sections
 * of nav links, or they can simply be more links or accordions
 */
export const EuiCollapsibleNavSubItem: FunctionComponent<
  EuiCollapsibleNavSubItemProps
> = ({ isGroupTitle, className, ...props }) => {
  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavSubItemGroupTitleStyles(euiTheme);
  const classes = classNames('euiCollapsibleNavSubItem', className);

  if (isGroupTitle) {
    const TitleElement = props.titleElement || 'div';
    return (
      <EuiTitle
        size="xxxs"
        css={styles.euiCollapsibleNavItem__groupTitle}
        className="euiCollapsibleNavItem__groupTitle eui-textTruncate"
      >
        <TitleElement>{props.title}</TitleElement>
      </EuiTitle>
    );
  }

  return (
    <EuiCollapsibleNavItemDisplay className={classes} {...props} isSubItem />
  );
};

/**
 * The actual exported component
 */

export const EuiCollapsibleNavItem: FunctionComponent<
  EuiCollapsibleNavItemProps
> = ({ className, ...props }) => {
  const classes = classNames('euiCollapsibleNavItem', className);

  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);

  return isCollapsed && isPush ? (
    <EuiCollapsedNavItem className={classes} {...props} />
  ) : (
    <EuiCollapsibleNavItemDisplay
      className={classes}
      {...props}
      isSubItem={false}
    />
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId } from '../../../services';
import { EuiAccordion } from '../../accordion';

import {
  EuiCollapsibleNavSubItem,
  _SharedEuiCollapsibleNavItemProps,
  _EuiCollapsibleNavItemDisplayProps,
  EuiCollapsibleNavItemProps,
} from './collapsible_nav_item';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';
import { euiCollapsibleNavAccordionStyles } from './collapsible_nav_accordion.styles';

type EuiCollapsibleNavAccordionProps = Omit<
  _SharedEuiCollapsibleNavItemProps,
  'items'
> &
  _EuiCollapsibleNavItemDisplayProps & {
    buttonContent: ReactNode;
    // On the main `EuiCollapsibleNavItem` component, this uses `EuiCollapsibleNavSubItemProps`
    // to allow for section headings, but by the time `items` reaches this component, we
    // know for sure it's an actual accordion item and not a section heading
    items: EuiCollapsibleNavItemProps[];
  };

/**
 * Internal nav accordion component.
 *
 * Renders children as either a nav link or any number/nesting of more nav accordions.
 * Triggering the open/closed state is handled only by the accordion `arrow` for
 * UX consistency, as accordion/nav titles can be their own links to pages.
 */
export const EuiCollapsibleNavAccordion: FunctionComponent<
  EuiCollapsibleNavAccordionProps
> = ({
  id,
  className,
  items,
  href, // eslint-disable-line local/href-with-rel
  isSubItem,
  isSelected,
  linkProps,
  accordionProps,
  buttonContent,
  children: _children, // Make sure this isn't spread
  ...rest
}) => {
  const classes = classNames('euiCollapsibleNavAccordion', className);
  const groupID = useGeneratedHtmlId({ conditionalId: id });

  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavAccordionStyles(euiTheme);
  const cssStyles = [
    styles.euiCollapsibleNavAccordion,
    isSubItem ? styles.isSubItem : styles.isTopItem,
    isSelected && styles.isSelected,
    accordionProps?.css,
  ];

  /**
   * Title / accordion trigger
   */
  const isTitleInteractive = !!(href || linkProps?.onClick);

  // Stop propagation on the title so that the accordion toggle doesn't occur on click
  // (should only occur on accordion arrow click for UX consistency)
  const stopPropagationClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement> & MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      linkProps?.onClick?.(e);
    },
    [linkProps?.onClick] // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * Child items
   */
  // If any of the sub items have an icon, default to an
  // icon of `empty` so that all text lines up vertically
  const itemsHaveIcons = useMemo(
    () => items.some((item) => !!item.icon),
    [items]
  );
  const icon = itemsHaveIcons ? 'empty' : undefined;

  const childrenCssStyles = [
    styles.children.euiCollapsibleNavAccordion__children,
    isSubItem ? styles.children.isSubItem : styles.children.isTopItem,
  ];

  const children = (
    <div
      css={childrenCssStyles}
      className="euiCollapsibleNavAccordion__children"
    >
      {items.map((item, index) => (
        // This is an intentional circular dependency between the accordion & parent item display.
        // EuiSideNavItem is purposely recursive to support any amount of nested sub items,
        // and split up into separate files/components for better dev readability
        <EuiCollapsibleNavSubItem key={index} icon={icon} {...item} />
      ))}
    </div>
  );

  return (
    <EuiAccordion
      id={groupID}
      className={classes}
      initialIsOpen={isSelected}
      buttonElement="div"
      buttonContent={
        <EuiCollapsibleNavLink
          href={href}
          {...linkProps}
          isSelected={isSelected}
          isSubItem={isSubItem}
          onClick={stopPropagationClick}
          isInteractive={isTitleInteractive}
        >
          {buttonContent}
        </EuiCollapsibleNavLink>
      }
      arrowDisplay="right"
      {...rest}
      {...accordionProps}
      css={cssStyles}
      arrowProps={{
        iconSize: 's',
        ...accordionProps?.arrowProps,
        css: [
          styles.euiCollapsibleNavAccordion__arrow,
          accordionProps?.arrowProps?.css,
        ],
      }}
    >
      {children}
    </EuiAccordion>
  );
};

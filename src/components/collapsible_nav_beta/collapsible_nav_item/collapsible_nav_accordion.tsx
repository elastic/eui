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
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId } from '../../../services';
import { EuiAccordion } from '../../accordion';

import {
  EuiCollapsibleNavSubItems,
  EuiCollapsibleNavSubItemProps,
  _SharedEuiCollapsibleNavItemProps,
  _EuiCollapsibleNavItemDisplayProps,
} from './collapsible_nav_item';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';
import { euiCollapsibleNavAccordionStyles } from './collapsible_nav_accordion.styles';

type EuiCollapsibleNavAccordionProps = Omit<
  _SharedEuiCollapsibleNavItemProps,
  'items'
> &
  _EuiCollapsibleNavItemDisplayProps & {
    buttonContent: ReactNode;
    items: EuiCollapsibleNavSubItemProps[];
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
      <EuiCollapsibleNavSubItems
        items={items}
        isSubItem={isSubItem}
        className="euiCollapsibleNavAccordion__children"
      />
    </EuiAccordion>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiTheme, useGeneratedHtmlId } from '../../../services';
import { EuiAccordion } from '../../accordion';

import {
  type _SharedEuiCollapsibleNavItemProps,
  type _EuiCollapsibleNavItemDisplayProps,
  type EuiCollapsibleNavItemProps,
  EuiCollapsibleNavSubItems,
} from './collapsible_nav_item';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';
import { euiCollapsibleNavAccordionStyles } from './collapsible_nav_accordion.styles';

type EuiCollapsibleNavAccordionProps = _SharedEuiCollapsibleNavItemProps &
  _EuiCollapsibleNavItemDisplayProps &
  Pick<EuiCollapsibleNavItemProps, 'accordionProps'> &
  Required<Pick<EuiCollapsibleNavItemProps, 'items'>> & {
    buttonContent: ReactNode;
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
  isSubItem,
  isSelected,
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

  return (
    <EuiAccordion
      id={groupID}
      className={classes}
      initialIsOpen={isSelected}
      buttonContent={
        <EuiCollapsibleNavLink
          isSelected={isSelected}
          isSubItem={isSubItem}
          isInteractive={false}
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

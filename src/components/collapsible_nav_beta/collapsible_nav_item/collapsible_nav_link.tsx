/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { EuiLink, EuiLinkProps } from '../../link';

import type {
  _SharedEuiCollapsibleNavItemProps,
  _EuiCollapsibleNavItemDisplayProps,
} from './collapsible_nav_item';
import { euiCollapsibleNavLinkStyles } from './collapsible_nav_link.styles';

type EuiCollapsibleNavLinkProps = Omit<EuiLinkProps, 'children'> &
  Omit<_SharedEuiCollapsibleNavItemProps, 'items' | 'accordionProps'> &
  _EuiCollapsibleNavItemDisplayProps & {
    children: ReactNode;
    isInteractive?: boolean;
    isNotAccordion?: boolean;
  };

/**
 * Internal nav link component.
 *
 * Can be rendered as a standalone nav item, or as part of an accordion header.
 * Can also be rendered as top-level item (has a background hover) or as a
 * sub-item (renders closer to plain text).
 *
 * In terms of DOM output, follows the same logic as EuiLink (renders either
 * an `a` tag or a `button` if no valid link exists), and can also additionally
 * rendered a plain `span` if the item is not interactive.
 */
export const EuiCollapsibleNavLink: FunctionComponent<
  EuiCollapsibleNavLinkProps
> = ({
  href,
  rel,
  children,
  className,
  isSelected,
  isInteractive = true,
  isNotAccordion,
  isSubItem,
  linkProps,
  ...rest
}) => {
  const classes = classNames(
    'euiCollapsibleNavLink',
    className,
    isInteractive && linkProps?.className
  );
  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavLinkStyles(euiTheme);
  const cssStyles = [
    styles.euiCollapsibleNavLink,
    isSelected && styles.isSelected,
    isSubItem ? styles.isSubItem : styles.isTopItem.isTopItem,
    isNotAccordion && !isSubItem && styles.isTopItem.isNotAccordion,
    isInteractive &&
      !isSelected &&
      !isSubItem &&
      styles.isTopItem.isInteractive,
    isInteractive && linkProps?.css,
  ];

  return isInteractive ? (
    <EuiLink
      href={href}
      rel={rel}
      {...({ ...rest, ...linkProps } as any)} // EuiLink ExclusiveUnion shenanigans
      className={classes}
      css={cssStyles}
    >
      {children}
    </EuiLink>
  ) : (
    <span className={classes} css={cssStyles} {...rest}>
      {children}
    </span>
  );
};

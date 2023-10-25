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

import {
  EuiCollapsibleNavSubItems,
  EuiCollapsibleNavSubItemProps,
  _SharedEuiCollapsibleNavItemProps,
  _EuiCollapsibleNavItemDisplayProps,
} from './collapsible_nav_item';
import { euiCollapsibleNavItemVariables } from './collapsible_nav_item.styles';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';

type EuiCollapsibleNavGroupProps = Omit<
  _SharedEuiCollapsibleNavItemProps,
  'items' | 'accordionProps'
> &
  _EuiCollapsibleNavItemDisplayProps & {
    header: ReactNode;
    items: EuiCollapsibleNavSubItemProps[];
  };

/**
 * Internal nav group. Should look the same as an open accordion,
 * but not be toggle-able to close.
 *
 * Yes, I know this is the 3rd component in EUI named EuiCollapsibleNavGroup :|
 * I'm waiting for serverless's design architecture to settle before untangling
 * this pasghetti
 */
export const EuiCollapsibleNavGroup: FunctionComponent<
  EuiCollapsibleNavGroupProps
> = ({
  className,
  header,
  href, // eslint-disable-line local/href-with-rel
  items,
  isSubItem,
  isSelected,
  linkProps,
  children: _children, // Make sure this isn't spread
  ...rest
}) => {
  const classes = classNames('euiCollapsibleNavGroup', className);

  const euiTheme = useEuiTheme();
  const sharedStyles = euiCollapsibleNavItemVariables(euiTheme);
  const cssStyles = !isSubItem
    ? {
        css: {
          margin: sharedStyles.padding,
          label: 'euiCollapsibleNavGroup-isTopItem',
        },
      }
    : undefined; // Prevents Emotion from generating a selector if no styles need to be applied

  return (
    <div role="group" className={classes} {...cssStyles} {...rest}>
      <EuiCollapsibleNavLink
        href={href}
        {...linkProps}
        isSelected={isSelected}
        isSubItem={isSubItem}
        isInteractive={!!(href || rest.onClick || linkProps?.onClick)}
      >
        {header}
      </EuiCollapsibleNavLink>
      <EuiCollapsibleNavSubItems
        items={items}
        isSubItem={isSubItem}
        className="euiCollapsibleNavGroup__children"
      />
    </div>
  );
};

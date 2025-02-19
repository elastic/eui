/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';

import {
  type _SharedEuiCollapsibleNavItemProps,
  type _EuiCollapsibleNavItemDisplayProps,
  type EuiCollapsibleNavItemProps,
  EuiCollapsibleNavSubItems,
} from './collapsible_nav_item';
import { euiCollapsibleNavItemVariables } from './collapsible_nav_item.styles';
import { EuiCollapsibleNavLink } from './collapsible_nav_link';

type EuiCollapsibleNavGroupProps = _SharedEuiCollapsibleNavItemProps &
  _EuiCollapsibleNavItemDisplayProps &
  Required<Pick<EuiCollapsibleNavItemProps, 'items'>> & {
    header?: ReactNode;
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
  items,
  isSubItem,
  isSelected,
  children: _children, // Make sure this isn't spread
  ...rest
}) => {
  const classes = classNames('euiCollapsibleNavGroup', className);

  const sharedStyles = useEuiMemoizedStyles(euiCollapsibleNavItemVariables);
  const cssStyles = !isSubItem
    ? {
        css: {
          margin: sharedStyles.padding,
          label: 'euiCollapsibleNavGroup-isTopItem',
        },
      }
    : undefined; // Prevents Emotion from generating a selector if no styles need to be applied

  const labelledById = useGeneratedHtmlId();

  return (
    <div className={classes} {...cssStyles} {...rest}>
      {header ? (
        <EuiCollapsibleNavLink
          id={labelledById}
          isSelected={isSelected}
          isSubItem={isSubItem}
          isInteractive={false}
        >
          {header}
        </EuiCollapsibleNavLink>
      ) : null}
      <EuiCollapsibleNavSubItems
        items={items}
        isSubItem={isSubItem}
        className="euiCollapsibleNavGroup__children"
        role="group"
        aria-labelledby={labelledById}
      />
    </div>
  );
};

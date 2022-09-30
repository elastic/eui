/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, ElementType } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { euiFlexItemStyles } from './flex_item.styles';

export interface EuiFlexItemProps {
  grow?: boolean | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null; // Leave this as an inline string enum so the props table properly parses it
  /**
   * @default div
   */
  component?: ElementType;
}

export const EuiFlexItem: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiFlexItemProps
> = ({
  children,
  className,
  grow = true,
  component: Component = 'div',
  ...rest
}) => {
  validateGrowValue(grow);

  const styles = euiFlexItemStyles();
  const cssStyles = [
    styles.euiFlexItem,
    !grow ? styles.growZero : styles.grow,
    grow &&
      (typeof grow === 'number'
        ? styles.growSizes[grow]
        : styles.growSizes['1']),
  ];

  const classes = classNames('euiFlexItem', className);

  return (
    <Component css={cssStyles} className={classes} {...rest}>
      {children}
    </Component>
  );
};

export const VALID_GROW_VALUES = [
  null,
  undefined,
  true,
  false,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
] as const;
function validateGrowValue(value: EuiFlexItemProps['grow']) {
  if (VALID_GROW_VALUES.indexOf(value) === -1) {
    throw new Error(
      `Prop \`grow\` passed to \`EuiFlexItem\` must be a boolean or an integer between 0 and 10, received \`${value}\``
    );
  }
}

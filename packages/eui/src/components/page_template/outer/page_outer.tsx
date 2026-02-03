/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { useIsWithinBreakpoints } from '../../../services';
import { _EuiThemeBreakpoint } from '../../../global_styling';
import { euiPageOuterStyles } from './page_outer.styles';

export const PAGE_DIRECTIONS = ['row', 'column'] as const;
type PageDirections = (typeof PAGE_DIRECTIONS)[number];

export interface _EuiPageOuterProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Adds `flex-grow: 1` to the whole page for stretching to fit vertically.
   * Must be wrapped inside a flexbox, preferrably with `min-height: 100vh`
   */
  grow?: boolean;
  /**
   * Changes the `flex-direction` property.
   * Flip to `column` when not including a sidebar.
   */
  direction?: PageDirections;
  /**
   * When direction is `row`, it will flip to `column` when within these breakpoints.
   */
  responsive?: _EuiThemeBreakpoint[];
}

export const _EuiPageOuter: FunctionComponent<_EuiPageOuterProps> = ({
  children,
  grow = true,
  direction = 'row',
  responsive = ['xs', 's'],
  ...rest
}) => {
  const styles = euiPageOuterStyles;
  const isResponding = useIsWithinBreakpoints(responsive);

  const cssStyles = [
    styles.euiPageOuter,
    styles[isResponding ? 'column' : direction],
    grow && styles.grow,
  ];

  return (
    <div css={cssStyles} {...rest}>
      {children}
    </div>
  );
};

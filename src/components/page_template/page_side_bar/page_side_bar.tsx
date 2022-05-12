/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import {
  EuiPaddingSize,
  logicalStyle,
  logicalUnit,
  useEuiPaddingCSS,
  _EuiThemeBreakpoint,
} from '../../../global_styling';
import { useEuiTheme, useIsWithinBreakpoints } from '../../../services';
import { euiPageSidebarStyles } from './page_side_bar.styles';

export interface _EuiPageSidebarProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    EuiPaddingSize {
  /**
   * Adds `position: sticky` and affords for any fixed position headers.
   */
  sticky?: {
    /**
     * To account for any fixed elements like headers,
     * pass in the value of the total height of those fixed elements.
     */
    offset: number;
  };
  /**
   * A minimum width is necessary to maintain size.
   * Be sure to take `paddingSize` into account.
   */
  minWidth?: CSSProperties['width'];
  /**
   * Sets the `minWidth` to 100% when within these breakpoints.
   */
  responsive?: _EuiThemeBreakpoint[];
}

export const _EuiPageSidebar: FunctionComponent<_EuiPageSidebarProps> = ({
  children,
  className,
  sticky,
  paddingSize = 'none',
  minWidth = 260,
  responsive = ['xs', 's'],
  style,
  ...rest
}) => {
  const themeContext = useEuiTheme();
  const styles = euiPageSidebarStyles(themeContext);
  const isResponding = useIsWithinBreakpoints(responsive);

  const cssStyles = [
    styles.euiPageSidebar,
    !isResponding && sticky && styles.sticky,
    useEuiPaddingCSS()[paddingSize],
  ];

  // Inline styles for setting up width and sticky offsets
  let inlineStyles = {
    ...style,
    ...logicalStyle('min-width', isResponding ? '100%' : minWidth),
  };
  if (!isResponding && sticky) {
    inlineStyles = {
      ...inlineStyles,
      ...logicalStyle('top', sticky.offset),
      ...logicalStyle(
        'max-height',
        `calc(100${logicalUnit.vh} - ${sticky.offset}px)`
      ),
    };
  }

  return (
    <div className={className} css={cssStyles} style={inlineStyles} {...rest}>
      {children}
    </div>
  );
};

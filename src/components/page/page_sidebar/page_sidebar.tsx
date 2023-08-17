/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  useLayoutEffect,
  useState,
} from 'react';
import { CommonProps } from '../../common';
import {
  EuiPaddingSize,
  logicalStyle,
  useEuiPaddingCSS,
  _EuiThemeBreakpoint,
} from '../../../global_styling';
import { useEuiTheme, useIsWithinBreakpoints } from '../../../services';
import { euiPageSidebarStyles } from './page_sidebar.styles';

export interface EuiPageSidebarProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages.
   */
  paddingSize?: EuiPaddingSize;
  /**
   * Adds `position: sticky` and affords for any fixed position headers.
   */
  sticky?:
    | boolean
    | {
        /**
         * To account for any fixed elements like headers,
         * pass in the value of the total height of those fixed elements.
         */
        offset?: number;
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

export const EuiPageSidebar: FunctionComponent<EuiPageSidebarProps> = ({
  children,
  className,
  sticky = false,
  paddingSize = 'none',
  minWidth = 248,
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
  const [inlineStyles, setInlineStyles] = useState({
    ...style,
    ...logicalStyle('min-width', isResponding ? '100%' : minWidth),
  });

  useLayoutEffect(() => {
    let updatedStyles = {
      ...style,
      ...logicalStyle('min-width', isResponding ? '100%' : minWidth),
    };

    if (sticky) {
      const euiHeaderFixedCounter = Number(
        document.body.dataset.fixedHeaders ?? 0
      );

      const offset =
        typeof sticky === 'object'
          ? sticky?.offset
          : themeContext.euiTheme.base * 3 * euiHeaderFixedCounter;

      updatedStyles = {
        ...updatedStyles,
        ...logicalStyle('top', offset),
        ...logicalStyle('max-height', `calc(100vh - ${offset}px)`),
      };
    }

    setInlineStyles(updatedStyles);
  }, [style, sticky, themeContext.euiTheme.base, isResponding, minWidth]);

  return (
    <div className={className} css={cssStyles} style={inlineStyles} {...rest}>
      {children}
    </div>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import {
  setStyleForRestrictedPageWidth,
  _EuiPageRestrictWidth,
} from './_restrict_width';
import {
  useEuiPaddingCSS,
  EuiPaddingSize,
  useEuiBackgroundColorCSS,
} from '../../global_styling';
import { euiPageStyles } from './page.styles';
import { useEuiTheme } from '../../services';

export interface EuiPageProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _EuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: EuiPaddingSize;
  /**
   * Adds `flex-grow: 1` to the whole page for stretching to fit vertically.
   * Must be wrapped inside a flexbox, preferrably with `min-height: 100vh`
   */
  grow?: boolean;
  /**
   * Changes the `flex-direction` property.
   * Flip to `column` when not including a sidebar.
   */
  direction?: 'row' | 'column';
  /**
   * Defines the page background color.
   * @default 'transparent'
   */
  color?: 'plain' | 'transparent';
}

export const EuiPage: FunctionComponent<EuiPageProps> = ({
  children,
  restrictWidth = false,
  className,
  paddingSize = 'none',
  grow = true,
  direction = 'row',
  color = 'transparent',
  ...rest
}) => {
  // Set max-width as a style prop
  const widthStyles = setStyleForRestrictedPageWidth(
    restrictWidth,
    rest?.style
  );

  const euiTheme = useEuiTheme();
  const styles = euiPageStyles(euiTheme);
  const padding = useEuiPaddingCSS()[paddingSize as EuiPaddingSize];
  const backgroundColor = useEuiBackgroundColorCSS()[color];

  const stylesCSS = [
    styles.euiPage,
    styles[direction],
    backgroundColor,
    grow && styles.grow,
    padding,
    restrictWidth && styles.restrictWidth,
  ];

  const classes = classNames('euiPage', className);

  return (
    <div css={stylesCSS} className={classes} {...rest} style={widthStyles}>
      {children}
    </div>
  );
};

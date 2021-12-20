/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';
import { _EuiPanelDivlike, EuiPanel, EuiPanelProps } from '../../panel/panel';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

export interface EuiPageContentBodyProps
  extends CommonProps,
    Omit<_EuiPanelDivlike, 'onClick'>,
    _EuiPageRestrictWidth {
  paddingSize?: EuiPanelProps['paddingSize'];
  /**
   * Supports
   * `default`: Typical layout with panelled content;
   * `centeredBody`: The panelled content is centered;
   * `centeredContent`: Vertically and horizontally centers itself (requires parent to be flex); and
   * `empty`: Removes the panneling of the page content
   */
  // template?: typeof TEMPLATES[number];
  verticalPosition?: EuiPageContentVerticalPositions;
  horizontalPosition?: EuiPageContentHorizontalPositions;
}

export const EuiPageContentBody: FunctionComponent<EuiPageContentBodyProps> = ({
  // template = 'empty',
  paddingSize = 'none',
  restrictWidth = false,
  verticalPosition,
  horizontalPosition,
  children,
  style,
  className,
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPageContentBody',
    {
      [`euiPageContentBody--${widthClassName}`]: widthClassName,
      'euiPageContentBody--verticalCenter': verticalPosition === 'center',
      'euiPageContentBody--horizontalCenter': horizontalPosition === 'center',
    },
    className
  );

  // let paddingSize = _paddingSize;
  // if (template) {
  //   // paddingSize = 'l';
  // }

  return (
    <EuiPanel
      className={classes}
      style={newStyle || style}
      paddingSize={paddingSize}
      color="transparent"
      borderRadius="none"
      {...rest}
    >
      {children}
    </EuiPanel>
  );
};

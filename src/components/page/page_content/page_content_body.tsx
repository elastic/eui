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

export interface EuiPageContentBodyProps
  extends CommonProps,
    Omit<_EuiPanelDivlike, 'onClick'>,
    _EuiPageRestrictWidth {
  paddingSize?: EuiPanelProps['paddingSize'];
  bottomBorder?: boolean;
}

export const EuiPageContentBody: FunctionComponent<EuiPageContentBodyProps> = ({
  paddingSize = 'none',
  restrictWidth = false,
  bottomBorder = false,
  grow = false,
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
      'euiPageContentBody--bottomBorder': bottomBorder,
      [`euiPageContentBody--${widthClassName}`]: widthClassName,
    },
    className
  );

  return (
    <EuiPanel
      className={classes}
      style={newStyle || style}
      paddingSize={paddingSize}
      color="transparent"
      borderRadius="none"
      grow={grow}
      {...rest}
    >
      {children}
    </EuiPanel>
  );
};

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
import { _EuiPanelProps, _EuiPanelDivlike, EuiPanel } from '../../panel/panel';

import { _EuiPageTemplate } from '../_template';

export interface EuiPageContentBodyProps
  extends CommonProps,
    // Use only the div properties of EuiPanel (not button)
    _EuiPanelProps,
    Omit<_EuiPanelDivlike, 'onClick' | 'role'>,
    _EuiPageRestrictWidth,
    _EuiPageTemplate {}

export const EuiPageContentBody: FunctionComponent<EuiPageContentBodyProps> = ({
  template = 'empty',
  restrictWidth = false,
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
      'euiPageContentBody--centeredContent': template === 'centeredContent',
    },
    className
  );

  const panelProps = {
    borderRadius: rest.borderRadius || 'none',
    hasBorder: rest.hasBorder || false,
    hasShadow: rest.hasShadow || false,
    color: rest.color || 'transparent',
    paddingSize: rest.paddingSize || 'none',
  };

  if (template === 'centeredContent') {
    panelProps.borderRadius = rest.borderRadius || 'm';
    panelProps.color = rest.color || 'subdued';
  }

  return (
    <EuiPanel
      className={classes}
      style={newStyle || style}
      {...panelProps}
      {...rest}
    >
      {children}
    </EuiPanel>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiPaddingSize } from '../../global_styling';
import { EuiBottomBar, EuiBottomBarProps } from '../bottom_bar';
import { EuiPageSection } from '../page/page_section';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';

export interface _EuiPageBottomBarProps
  extends EuiPaddingSize,
    _EuiPageRestrictWidth,
    Omit<EuiBottomBarProps, 'paddingSize'> {}

export const _EuiPageBottomBar: FunctionComponent<_EuiPageBottomBarProps> = ({
  children,
  className,
  paddingSize,
  restrictWidth,
  style,
  ...rest
}) => {
  return (
    <EuiBottomBar
      paddingSize={'none'}
      position="sticky"
      style={{ flexShrink: 0, ...style }}
      // Using uknown here because of the possible conflict with overriding props and position `sticky`
      {...(rest as unknown)}
    >
      {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageSection paddingSize={paddingSize} restrictWidth={restrictWidth}>
        {children}
      </EuiPageSection>
    </EuiBottomBar>
  );
};

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiPanel, PanelProps } from '../panel';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { useIsWithinBreakpoints } from '../../../services/hooks';

export type _EuiSplitPanelInnerProps = Omit<
  PanelProps,
  'hasShadow' | 'borderRadius'
>;

export const _EuiSplitPanelInner: FunctionComponent<_EuiSplitPanelInnerProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSplitPanel__inner', className);

  const panelProps: PanelProps = {
    hasShadow: false,
    color: 'transparent',
    borderRadius: 'none',
  };

  return (
    <EuiPanel className={classes} {...panelProps} {...rest}>
      {children}
    </EuiPanel>
  );
};

export type _EuiSplitPanelOuterProps = {
  /**
   * Any number of #EuiSplitPanelInner components
   */
  children?: ReactNode;
  /**
   * Changes the flex-direction
   */
  direction?: 'column' | 'row';
  /**
   * Stacks row display on small screens
   */
  responsive?: false | EuiBreakpointSize[];
} & Omit<PanelProps, 'paddingSize'>;

export const _EuiSplitPanelOuter: FunctionComponent<_EuiSplitPanelOuterProps> = ({
  children,
  className,
  direction = 'column',
  responsive = ['xs', 's'],
  ...rest
}) => {
  const isResponsive = useIsWithinBreakpoints(
    responsive as EuiBreakpointSize[],
    !!responsive
  );

  const classes = classNames(
    'euiSplitPanel',
    {
      'euiSplitPanel--row': direction === 'row',
      'euiSplitPanel-isResponsive': isResponsive,
    },
    className
  );

  return (
    <EuiPanel paddingSize="none" grow={false} className={classes} {...rest}>
      {children}
    </EuiPanel>
  );
};

export const EuiSplitPanel = {
  Outer: _EuiSplitPanelOuter,
  Inner: _EuiSplitPanelInner,
};

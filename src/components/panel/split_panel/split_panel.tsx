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

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { EuiPanel, _EuiPanelProps } from '../panel';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { useIsWithinBreakpoints } from '../../../services/hooks';

export type _EuiSplitPanelInnerProps = HTMLAttributes<HTMLDivElement> &
  Omit<_EuiPanelProps, 'hasShadow' | 'hasBorder' | 'borderRadius'>;

/**
 * Consumed via `EuiSplitPanel.Inner`.
 * Extends most `EuiPanelProps`.
 */
export const _EuiSplitPanelInner: FunctionComponent<_EuiSplitPanelInnerProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSplitPanel__inner', className);

  const panelProps: _EuiPanelProps = {
    hasShadow: false,
    color: 'transparent',
    borderRadius: 'none',
    hasBorder: false,
  };

  return (
    <EuiPanel
      element="div"
      className={classes}
      {...panelProps}
      {...(rest as _EuiPanelProps)}>
      {children}
    </EuiPanel>
  );
};

export type _EuiSplitPanelOuterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Any number of _EuiSplitPanelInner components
   */
  children?: ReactNode;
  /**
   * Changes the flex-direction
   */
  direction?: 'column' | 'row';
  /**
   * Stacks row display on small screens.
   * Remove completely with `false` or provide your own list of breakpoint sizes to stack on.
   */
  responsive?: false | EuiBreakpointSize[];
} & Omit<_EuiPanelProps, 'paddingSize'>;

/**
 * Consumed via `EuiSplitPanel.Outer`.
 * Extends most `EuiPanelProps`.
 */
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
    <EuiPanel
      paddingSize="none"
      grow={false}
      className={classes}
      {...(rest as _EuiPanelProps)}>
      {children}
    </EuiPanel>
  );
};

export const EuiSplitPanel = {
  Outer: _EuiSplitPanelOuter,
  Inner: _EuiSplitPanelInner,
};

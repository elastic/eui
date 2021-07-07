/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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

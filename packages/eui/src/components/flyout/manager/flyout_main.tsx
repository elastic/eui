/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiManagedFlyout, type EuiManagedFlyoutProps } from './flyout_managed';
import { useHasChildFlyout, useFlyoutId } from './hooks';
import { euiMainFlyoutStyles } from './flyout_main.styles';
import { useEuiMemoizedStyles } from '../../../services';
import {
  DEFAULT_PUSH_MIN_BREAKPOINT,
  DEFAULT_SIDE,
  DEFAULT_TYPE,
} from '../const';
import { useIsPushed } from '../hooks';
import { LEVEL_MAIN } from './const';

/**
 * Props for `EuiFlyoutMain`, the primary managed flyout component.
 * The `level` prop is fixed internally to `main` and is therefore omitted.
 */
export type EuiFlyoutMainProps = Omit<EuiManagedFlyoutProps, 'level'>;

/**
 * Managed main flyout. Handles ID management, child-flyout styling,
 * and push/overlay behavior based on provided props.
 */
export function EuiFlyoutMain({
  id,
  pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
  type = DEFAULT_TYPE,
  side = DEFAULT_SIDE,
  ...props
}: EuiFlyoutMainProps) {
  const flyoutId = useFlyoutId(id);
  const hasChildFlyout = useHasChildFlyout(flyoutId);
  const styles = useEuiMemoizedStyles(euiMainFlyoutStyles);
  const isPushed = useIsPushed({ type, pushMinBreakpoint });

  const cssStyles = [
    hasChildFlyout && !isPushed && styles.hasChildFlyout[side],
  ];

  const style: React.CSSProperties = {};

  return (
    <EuiManagedFlyout
      id={flyoutId}
      level={LEVEL_MAIN}
      style={style}
      css={cssStyles}
      {...{ ...props, pushMinBreakpoint, type, side }}
    />
  );
}

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiFlyoutComponentProps } from '../flyout.component';
import { EuiManagedFlyout } from './flyout_managed';
import { useHasChildFlyout } from './flyout_manager';
import { useFlyoutId } from './hooks';
import { euiMainFlyoutStyles } from './flyout_main.styles';
import { useEuiMemoizedStyles } from '../../../services';
import {
  DEFAULT_PUSH_MIN_BREAKPOINT,
  DEFAULT_SIDE,
  DEFAULT_TYPE,
} from '../const';
import { useIsPushed } from '../hooks';

export interface EuiFlyoutMainProps extends EuiFlyoutComponentProps {}

export function EuiFlyoutMain({
  id,
  ownFocus: ownFocusProp,
  pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
  type = DEFAULT_TYPE,
  side = DEFAULT_SIDE,
  ...props
}: EuiFlyoutMainProps) {
  const flyoutId = useFlyoutId(id);
  const hasChildFlyout = useHasChildFlyout(flyoutId);
  const styles = useEuiMemoizedStyles(euiMainFlyoutStyles);
  const isPushed = useIsPushed({ type, pushMinBreakpoint });

  const ownFocus = hasChildFlyout ? false : ownFocusProp;
  const cssStyles = [
    hasChildFlyout && !isPushed && styles.hasChildFlyout[side],
  ];

  return (
    <EuiManagedFlyout
      id={flyoutId}
      css={cssStyles}
      level="main"
      {...{ ...props, ownFocus, pushMinBreakpoint, type, side }}
    />
  );
}

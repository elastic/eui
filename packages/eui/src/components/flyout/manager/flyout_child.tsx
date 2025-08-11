/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { useEuiMemoizedStyles, useEuiTheme } from '../../../services';
import { euiChildFlyoutStyles } from './flyout_child.styles';
import { EuiManagedFlyout, type EuiManagedFlyoutProps } from './flyout_managed';
import {
  useCurrentMainFlyout,
  useFlyoutLayoutMode,
  useFlyoutWidth,
} from './hooks';
import {
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_CHILD,
} from './const';

/**
 * Props for `EuiFlyoutChild`, a managed child flyout that pairs with a main flyout.
 *
 * Notes:
 * - `type`, `side`, and `level` are fixed by the component and thus omitted.
 * - `backgroundStyle` toggles between default and shaded backgrounds.
 */
export interface EuiFlyoutChildProps
  extends Omit<
    EuiManagedFlyoutProps,
    'closeButtonPosition' | 'hideCloseButton' | 'side' | 'type' | 'level'
  > {
  backgroundStyle?: 'default' | 'shaded';
}

/**
 * Managed child flyout that renders alongside or stacked over the main flyout,
 * depending on the current layout mode. Handles background styling and required
 * managed flyout props.
 */
export function EuiFlyoutChild({
  css: customCss,
  backgroundStyle,
  ...props
}: EuiFlyoutChildProps) {
  const { euiTheme } = useEuiTheme();
  const styles = useEuiMemoizedStyles(euiChildFlyoutStyles);
  const mainWidth = useFlyoutWidth(useCurrentMainFlyout()?.flyoutId);
  const layoutMode = useFlyoutLayoutMode();

  let style: React.CSSProperties = {};
  if (mainWidth && layoutMode === LAYOUT_MODE_SIDE_BY_SIDE) {
    style = { right: mainWidth };
  } else if (layoutMode === LAYOUT_MODE_STACKED) {
    style = { zIndex: Number(euiTheme.levels.flyout) + 2 };
  }

  return (
    <EuiManagedFlyout
      {...props}
      style={style}
      level={LEVEL_CHILD}
      type="overlay"
      ownFocus={false}
      css={[
        backgroundStyle === 'shaded'
          ? styles.backgroundShaded
          : styles.backgroundDefault,
        customCss,
      ]}
    />
  );
}

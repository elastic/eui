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
} from './flyout_manager';

export interface EuiFlyoutChildProps
  extends Omit<
    EuiManagedFlyoutProps,
    'closeButtonPosition' | 'hideCloseButton' | 'side' | 'type' | 'level'
  > {
  backgroundStyle?: 'default' | 'shaded';
}

export function EuiFlyoutChild({
  css: customCss,
  backgroundStyle,
  ...props
}: EuiFlyoutChildProps) {
  const { euiTheme } = useEuiTheme();
  const styles = useEuiMemoizedStyles(euiChildFlyoutStyles);
  const mainWidth = useFlyoutWidth(useCurrentMainFlyout()?.flyoutId);
  const layoutMode = useFlyoutLayoutMode();

  let style: { right?: number; zIndex?: number } = {};
  if (mainWidth && layoutMode === 'side-by-side') {
    style = { right: mainWidth };
  } else if (layoutMode === 'stacked') {
    style = { zIndex: Number(euiTheme.levels.flyout) + 2 };
  }

  return (
    <EuiManagedFlyout
      {...props}
      style={style}
      level="child"
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

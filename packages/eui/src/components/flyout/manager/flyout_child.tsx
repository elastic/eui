/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { useEuiMemoizedStyles } from '../../../services';
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
  const styles = useEuiMemoizedStyles(euiChildFlyoutStyles);
  const mainWidth = useFlyoutWidth(useCurrentMainFlyout()?.flyoutId);
  const { layoutMode } = useFlyoutLayoutMode();

  let style: { right?: number } = {};
  if (mainWidth && layoutMode === 'side-by-side') {
    style = { right: mainWidth };
  }

  return (
    <EuiManagedFlyout
      style={style}
      level="child"
      {...props}
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

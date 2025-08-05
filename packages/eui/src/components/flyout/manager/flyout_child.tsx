/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { EuiFlyoutComponentProps } from '../flyout.component';
import { euiManagedFlyoutStyles } from './flyout.styles';
import { EuiManagedFlyout } from './flyout_managed';
import { useCurrentMainFlyout, useFlyoutWidth } from './flyout_manager';

export interface EuiFlyoutChildProps
  extends Omit<
    EuiFlyoutComponentProps,
    'closeButtonPosition' | 'hideCloseButton' | 'side' | 'type'
  > {
  backgroundStyle?: 'default' | 'shaded';
}

export function EuiFlyoutChild({
  css: customCss,
  backgroundStyle,
  ...props
}: EuiFlyoutChildProps) {
  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);
  const width = useFlyoutWidth(useCurrentMainFlyout()?.flyoutId);
  const style = width ? { right: width } : {};

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

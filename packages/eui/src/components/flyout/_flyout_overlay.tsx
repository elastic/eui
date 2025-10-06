/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import type { EuiFlyoutComponentProps } from './flyout.component';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiPortal } from '../portal';
import { useEuiTheme } from '../../services';

export interface EuiFlyoutOverlayProps extends PropsWithChildren {
  hasOverlayMask: boolean;
  maskProps: EuiFlyoutComponentProps['maskProps'];
  isPushed: boolean;
}

/**
 * Light wrapper for conditionally rendering portals or overlay masks:
 *  - If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
 *  - Otherwise still wrap within an EuiPortal so it appends to the bottom of the window.
 * Push flyouts have no overlay OR portal behavior.
 *
 * @internal
 */
export const EuiFlyoutOverlay = ({
  children,
  isPushed,
  maskProps,
  hasOverlayMask,
}: EuiFlyoutOverlayProps) => {
  const { euiTheme } = useEuiTheme();
  let content = children;

  if (!isPushed || hasOverlayMask) {
    content = <EuiPortal>{content}</EuiPortal>;
  }

  // TODO(tkajtoch): This should likely depend on maskProps.headerZIndexLocation
  // in cases where the mask has z-index 6000
  const maskLevel = Number(euiTheme.levels.flyout) - 1;

  return (
    <>
      {hasOverlayMask && (
        <EuiOverlayMask
          {...maskProps}
          // This needs to be a string due to the logic inside EuiOverlayMask.
          // It can't be a `css` prop either
          style={`z-index: ${maskLevel}`}
        />
      )}
      {content}
    </>
  );
};

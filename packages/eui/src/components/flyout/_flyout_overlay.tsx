/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, useMemo } from 'react';
import { css, cx } from '@emotion/css';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiPortal } from '../portal';
import type { EuiFlyoutComponentProps } from './flyout.component';

export interface EuiFlyoutOverlayProps extends PropsWithChildren {
  hasOverlayMask: boolean;
  maskProps: EuiFlyoutComponentProps['maskProps'];
  isPushed: boolean;
  maskZIndex: number;
}

const getEuiFlyoutOverlayStyles = (zIndex: number) => {
  /*
  This needs to have !important to override the default EuiOverlayMask
  z-index based on the headerZindexLocation prop. Using the style attribute
  doesn't work since EuiOverlayMask requires a string style prop that
  causes React errors in the test environment.
  */
  return css`
    z-index: ${zIndex} !important;
  `;
};

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
  maskZIndex,
}: EuiFlyoutOverlayProps) => {
  const styles = useMemo(
    () => getEuiFlyoutOverlayStyles(maskZIndex),
    [maskZIndex]
  );

  let content = children;

  if (!isPushed || hasOverlayMask) {
    content = <EuiPortal>{content}</EuiPortal>;
  }

  const classes = cx(maskProps?.className, styles);

  return (
    <>
      {hasOverlayMask && (
        <EuiOverlayMask
          headerZindexLocation="below"
          {...maskProps}
          className={classes}
        />
      )}
      {content}
    </>
  );
};

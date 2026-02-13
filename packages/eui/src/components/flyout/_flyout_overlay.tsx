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
  /**
   * Where the mask sits relative to fixed headers. In viewport mode (no container)
   * this defaults to 'above' so the flyout covers the full UI; in container mode, 'below'.
   */
  headerZindexLocation?: 'above' | 'below';
  /**
   * Optional container element for the portal to mount into.
   * When provided, the flyout is portaled into this element instead of `document.body`,
   * so it uses the container for both width and position (e.g. right-side flyouts
   * align to the container's right edge).
   */
  container?: HTMLElement;
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
  headerZindexLocation = 'below',
  container,
}: EuiFlyoutOverlayProps) => {
  const styles = useMemo(
    () => getEuiFlyoutOverlayStyles(maskZIndex),
    [maskZIndex]
  );

  let content = children;

  if (!isPushed || hasOverlayMask) {
    content = <EuiPortal container={container}>{content}</EuiPortal>;
  }

  const classes = cx(maskProps?.className, styles);

  return (
    <>
      {hasOverlayMask && (
        <EuiOverlayMask
          headerZindexLocation={maskProps?.headerZindexLocation ?? headerZindexLocation}
          {...maskProps}
          className={classes}
        />
      )}
      {content}
    </>
  );
};

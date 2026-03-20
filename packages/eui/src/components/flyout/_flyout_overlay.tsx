/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { css, cx } from '@emotion/css';
import { useCombinedRefs } from '../../services';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiPortal } from '../portal';
import type { EuiFlyoutComponentProps } from './flyout.component';

export interface EuiFlyoutOverlayProps extends PropsWithChildren {
  hasOverlayMask: boolean;
  maskProps: EuiFlyoutComponentProps['maskProps'];
  isPushed: boolean;
  maskZIndex: number;
  /**
   * Use 'above' to stack the flyout and mask above fixed headers (mask-level
   * z-index); 'below' to keep them in the flyout stacking level.
   */
  headerZindexLocation?: 'above' | 'below';
  /**
   * When provided, clips the overlay mask to the container's bounding rect
   * rather than covering the full viewport.
   */
  containerRect?: DOMRect | null;
}

const getEuiFlyoutOverlayStyles = (zIndex: number) => {
  /*
  This needs to have !important to override the default EuiOverlayMask
  z-index based on the headerZindexLocation prop. Using the style attribute
  doesn't work since EuiOverlayMask requires the styles to be provided via className
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
  containerRect,
}: EuiFlyoutOverlayProps) => {
  const styles = useMemo(
    () => getEuiFlyoutOverlayStyles(maskZIndex),
    [maskZIndex]
  );

  // Internal ref so we can apply containerRect positioning directly on the DOM
  // node, avoiding new Emotion CSS class generation on every scroll/resize.
  const internalMaskRef = useRef<HTMLDivElement>(null);
  const combinedMaskRef = useCombinedRefs([
    internalMaskRef,
    maskProps?.maskRef,
  ]);

  useEffect(() => {
    const node = internalMaskRef.current;
    if (!node) return;

    //  containerRect positioning must be applied via node.style.setProperty rather than
    //  through the style prop - EuiOverlayMask requires styles to be passed via className
    if (containerRect) {
      node.style.setProperty('inset-block-start', `${containerRect.top}px`);
      node.style.setProperty('inset-inline-start', `${containerRect.left}px`);
      node.style.setProperty('inline-size', `${containerRect.width}px`);
      node.style.setProperty('block-size', `${containerRect.height}px`);
      node.style.setProperty('inset-inline-end', 'auto');
      node.style.setProperty('inset-block-end', 'auto');
    } else {
      node.style.removeProperty('inset-block-start');
      node.style.removeProperty('inset-inline-start');
      node.style.removeProperty('inline-size');
      node.style.removeProperty('block-size');
      node.style.removeProperty('inset-inline-end');
      node.style.removeProperty('inset-block-end');
    }
  }, [containerRect, hasOverlayMask]); // toggling ownFocus while the flyout is already open should cause re-render

  let content = children;

  if (!isPushed || hasOverlayMask) {
    content = <EuiPortal>{content}</EuiPortal>;
  }

  const classes = cx(maskProps?.className, styles);

  return (
    <>
      {hasOverlayMask && (
        <EuiOverlayMask
          headerZindexLocation={
            maskProps?.headerZindexLocation ?? headerZindexLocation
          }
          {...maskProps}
          maskRef={combinedMaskRef}
          className={classes}
        />
      )}
      {content}
    </>
  );
};

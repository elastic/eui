/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CSSProperties } from 'react';
import { useEuiTheme } from '../../services';
import type { EuiOverlayMaskProps } from '../overlay_mask';

/**
 * @internal
 */
export interface UseEuiFlyoutZIndex {
  maskProps?: EuiOverlayMaskProps;
  isPushed: boolean;
  managedFlyoutIndex: number;
  isChildFlyout: boolean;
}

const calculateZIndex = (
  baseLevel: CSSProperties['zIndex'],
  isChildFlyout: boolean
) => {
  const level = Number(baseLevel);

  return {
    // Child flyouts slide in from below and need to have a lower z-index
    flyoutZIndex: isChildFlyout ? level - 1 : level,
    maskZIndex: level - 2,
  };
};

/**
 * @internal
 */
export const useEuiFlyoutZIndex = ({
  maskProps,
  isPushed,
  managedFlyoutIndex,
  isChildFlyout,
}: UseEuiFlyoutZIndex) => {
  const { euiTheme } = useEuiTheme();

  let baseLevel = Number(euiTheme.levels.flyout);

  // The default headerZindexLocation for EuiFlyout is "below"
  // which is different from what EuiOverlayMask fallbacks to - see
  // _flyout_overlay.tsx.
  // We set z-index to mask level only when explicitly overridden
  // via the maskProps prop
  if (!isPushed && maskProps?.headerZindexLocation === 'above') {
    baseLevel = Number(euiTheme.levels.mask);
  }

  baseLevel += managedFlyoutIndex;

  return calculateZIndex(baseLevel, isChildFlyout);
};

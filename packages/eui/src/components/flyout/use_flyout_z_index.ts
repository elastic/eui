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
}

const calculateZIndex = (initialValue: CSSProperties['zIndex']) => {
  const valueAsNumber = Number(initialValue);

  return {
    flyoutZIndex: valueAsNumber,
    maskZIndex: valueAsNumber - 1,
  };
};

/**
 * TODO: Calculate z-index values so that the latest flyout is always on top
 * https://github.com/elastic/eui/issues/9160
 * @internal
 */
export const useEuiFlyoutZIndex = ({
  maskProps,
  isPushed,
}: UseEuiFlyoutZIndex) => {
  const { euiTheme } = useEuiTheme();

  // The default headerZindexLocation for EuiFlyout is "below"
  // which is different from what EuiOverlayMask fallbacks to - see
  // _flyout_overlay.tsx.
  // We set z-index to mask level only when explicitly overridden
  // via the maskProps prop
  if (!isPushed && maskProps?.headerZindexLocation === 'above') {
    return calculateZIndex(euiTheme.levels.mask);
  }

  return calculateZIndex(euiTheme.levels.flyout);
};

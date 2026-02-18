/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CSSProperties } from 'react';
import { useEuiTheme } from '../../services';

/**
 * @internal
 */
export interface UseEuiFlyoutZIndex {
  /** Use 'above' to stack the flyout above fixed headers (mask-level z-index); 'below' otherwise. */
  headerZindexLocation?: 'above' | 'below';
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
  headerZindexLocation = 'below',
  isPushed,
  managedFlyoutIndex,
  isChildFlyout,
}: UseEuiFlyoutZIndex) => {
  const { euiTheme } = useEuiTheme();

  let baseLevel = Number(euiTheme.levels.flyout);

  // headerZindexLocation 'above' uses mask-level z-index so the flyout stacks
  // above fixed headers (which typically use a high z-index; DOM order alone
  // does not control stacking).
  if (!isPushed && headerZindexLocation === 'above') {
    baseLevel = Number(euiTheme.levels.mask);
  }

  baseLevel += managedFlyoutIndex;

  return calculateZIndex(baseLevel, isChildFlyout);
};

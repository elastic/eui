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
  /** Resolved mask position relative to header; in viewport mode defaults to 'above'. */
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

  // In viewport mode we default to 'above' so container={null} gives a global flyout;
  // use mask level z-index so the flyout and mask cover fixed headers.
  if (!isPushed && headerZindexLocation === 'above') {
    baseLevel = Number(euiTheme.levels.mask);
  }

  baseLevel += managedFlyoutIndex;

  return calculateZIndex(baseLevel, isChildFlyout);
};

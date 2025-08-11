/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useState } from 'react';
import { useEuiTheme } from '../../../services';
import type { EuiThemeComputed } from '../../../services/theme';
import { setLayoutMode } from './actions';
import {
  useCurrentChildFlyout,
  useCurrentMainFlyout,
  useCurrentSession,
  useFlyoutWidth,
} from './selectors';
import { useFlyoutManager } from './hooks';
import { LAYOUT_MODE_SIDE_BY_SIDE, LAYOUT_MODE_STACKED } from './const';
import { EuiFlyoutLayoutMode } from './types';

/**
 * Hook to handle responsive layout mode for managed flyouts.
 * Decides whether to place flyouts side-by-side or stacked based on
 * viewport width and flyout widths/sizes.
 */
export const useApplyFlyoutLayoutMode = () => {
  const context = useFlyoutManager();
  const setMode = React.useCallback(
    (layoutMode: EuiFlyoutLayoutMode) => {
      if (context?.dispatch) {
        context.dispatch(setLayoutMode(layoutMode));
      }
    },
    [context]
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { euiTheme } = useEuiTheme();

  const currentSession = useCurrentSession();
  const parentFlyoutId = currentSession?.main;
  const childFlyoutId = currentSession?.child;

  const parentFlyout = useCurrentMainFlyout();
  const childFlyout = useCurrentChildFlyout();

  const parentWidth = useFlyoutWidth(parentFlyoutId);
  const childWidth = useFlyoutWidth(childFlyoutId);

  useEffect(() => {
    if (!context) return;

    const currentLayoutMode = context.state.layoutMode;
    if (!childFlyoutId) {
      if (currentLayoutMode !== LAYOUT_MODE_SIDE_BY_SIDE)
        setMode(LAYOUT_MODE_SIDE_BY_SIDE);
      return;
    }

    let parentWidthValue = parentWidth;
    let childWidthValue = childWidth;

    if (!parentWidthValue && parentFlyout?.size) {
      parentWidthValue = getWidthFromSize(parentFlyout.size, euiTheme);
    }
    if (!childWidthValue && childFlyout?.size) {
      childWidthValue = getWidthFromSize(childFlyout.size, euiTheme);
    }

    if (!parentWidthValue || !childWidthValue) {
      if (currentLayoutMode !== LAYOUT_MODE_SIDE_BY_SIDE)
        setMode(LAYOUT_MODE_SIDE_BY_SIDE);
      return;
    }

    const combinedWidth = parentWidthValue + childWidthValue;
    const combinedWidthPercentage = (combinedWidth / windowWidth) * 100;
    const newLayoutMode =
      combinedWidthPercentage >= 90
        ? LAYOUT_MODE_STACKED
        : LAYOUT_MODE_SIDE_BY_SIDE;
    if (currentLayoutMode !== newLayoutMode) setMode(newLayoutMode);
  }, [
    windowWidth,
    context,
    parentWidth,
    setMode,
    childWidth,
    childFlyoutId,
    parentFlyout?.size,
    childFlyout?.size,
    euiTheme,
  ]);
};

/** Convert a flyout `size` value to a pixel width using theme breakpoints. */
export const getWidthFromSize = (
  size: string | number,
  euiTheme: EuiThemeComputed
): number => {
  if (typeof size === 'number') {
    return size;
  }

  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    switch (size) {
      case 's':
        return euiTheme.breakpoint.s;
      case 'm':
        return euiTheme.breakpoint.m;
      case 'l':
        return euiTheme.breakpoint.l;
      default:
        break;
    }
  }
  return 0;
};

/** Current layout mode for managed flyouts (`side-by-side` or `stacked`). */
export const useFlyoutLayoutMode = () => {
  const context = useFlyoutManager();
  return context?.state.layoutMode || LAYOUT_MODE_SIDE_BY_SIDE;
};

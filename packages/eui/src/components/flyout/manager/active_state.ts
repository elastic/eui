/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_MAIN,
  STAGE_ACTIVE,
  STAGE_BACKGROUNDED,
  STAGE_BACKGROUNDING,
  STAGE_CLOSING,
  STAGE_INACTIVE,
  STAGE_OPENING,
  STAGE_RETURNING,
} from './const';
import type { EuiFlyoutActiveState, EuiFlyoutLevel } from './types';
import {
  useFlyoutLayoutMode,
  useHasChildFlyout,
  useIsFlyoutActive,
} from './hooks';

export interface UseFlyoutActiveStateParams {
  flyoutId: string;
  level: EuiFlyoutLevel;
}

export interface UseFlyoutActiveStateReturn {
  activeState: EuiFlyoutActiveState;
  onAnimationEnd: () => void;
}

/**
 * Encapsulates all active state transitions and animation-driven updates
 * for managed flyouts.
 */
export const useFlyoutActiveState = (
  params: UseFlyoutActiveStateParams
): UseFlyoutActiveStateReturn => {
  const { flyoutId, level } = params;

  const isActive = useIsFlyoutActive(flyoutId);
  const hasChild = useHasChildFlyout(flyoutId);
  const layoutMode = useFlyoutLayoutMode();

  const [activeState, setActiveState] = useState<EuiFlyoutActiveState>(() =>
    isActive ? STAGE_ACTIVE : STAGE_OPENING
  );

  // Debug logging removed to avoid noisy console during resize

  // Layout mode transitions that affect main flyout behavior
  const activeStateRef = useRef<EuiFlyoutActiveState>(activeState);

  useEffect(() => {
    activeStateRef.current = activeState;
  }, [activeState]);

  const onAnimationEnd = useCallback(() => {
    const state = activeStateRef.current;

    switch (state) {
      case STAGE_OPENING:
      case STAGE_RETURNING:
        setActiveState(STAGE_ACTIVE);
        break;
      case STAGE_CLOSING:
        setActiveState(STAGE_INACTIVE);
        break;
      case STAGE_BACKGROUNDING:
        setActiveState(STAGE_BACKGROUNDED);
        break;
    }
  }, []);

  // Open/close transitions based on whether the flyout is part of the active session
  useEffect(() => {
    const state = activeStateRef.current;
    if (!isActive && state === STAGE_ACTIVE) {
      setActiveState(STAGE_CLOSING);
    } else if (isActive && state === STAGE_INACTIVE) {
      setActiveState(STAGE_RETURNING);
    }
  }, [isActive]);

  useEffect(() => {
    if (level !== LEVEL_MAIN || !isActive) {
      return;
    }

    const state = activeStateRef.current;

    if (
      layoutMode === LAYOUT_MODE_SIDE_BY_SIDE &&
      (state === STAGE_BACKGROUNDED || state === STAGE_BACKGROUNDING)
    ) {
      setActiveState(STAGE_RETURNING);
    }
  }, [level, layoutMode, isActive]);

  // When stacked, background the main if a child exists; return when the child closes
  useEffect(() => {
    if (level !== LEVEL_MAIN || !isActive) return;

    const currentActiveState = activeStateRef.current;

    if (
      hasChild &&
      layoutMode === LAYOUT_MODE_STACKED &&
      currentActiveState === STAGE_ACTIVE
    ) {
      setActiveState(STAGE_BACKGROUNDING);
    } else if (
      !hasChild &&
      (currentActiveState === STAGE_BACKGROUNDED ||
        currentActiveState === STAGE_BACKGROUNDING)
    ) {
      setActiveState(STAGE_RETURNING);
    }
  }, [level, isActive, layoutMode, hasChild]);

  return { activeState, onAnimationEnd };
};

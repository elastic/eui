/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef } from 'react';
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
import type { EuiFlyoutActivityStage, EuiFlyoutLevel } from './types';
import { setActivityStage } from './actions';
import { useFlyoutManager } from './provider';

export interface UseFlyoutActivityStageParams {
  flyoutId: string;
  level: EuiFlyoutLevel;
  /** When false, skip intermediate stages (CLOSING, RETURNING, BACKGROUNDING) and transition directly to final state. */
  shouldAnimate?: boolean;
}

export interface UseFlyoutActivityStageReturn {
  activityStage: EuiFlyoutActivityStage;
  /**
   * Pass to the flyout's `onAnimationEnd` prop to finalize transitional stages
   * (e.g. CLOSING -> INACTIVE). When `shouldAnimate` is false, the intermediate
   * CLOSING/RETURNING/BACKGROUNDING stages are skipped, but OPENING -> ACTIVE
   * still relies on this handler since new flyouts always start in OPENING.
   */
  onAnimationEnd: () => void;
}

/**
 * Returns the final stage after an animation completes.
 * OPENING/RETURNING -> ACTIVE; CLOSING -> INACTIVE; BACKGROUNDING -> BACKGROUNDED.
 */
const getNextStage = (
  stage: EuiFlyoutActivityStage
): EuiFlyoutActivityStage | null => {
  switch (stage) {
    case STAGE_OPENING:
    case STAGE_RETURNING:
      return STAGE_ACTIVE;
    case STAGE_CLOSING:
      return STAGE_INACTIVE;
    case STAGE_BACKGROUNDING:
      return STAGE_BACKGROUNDED;
    default:
      return null;
  }
};

/**
 * Encapsulates all activity-stage transitions and animation-driven updates
 * for managed flyouts.
 *
 * Performance: reads `useFlyoutManager()` once and derives isActive,
 * hasChild, and layoutMode inline (replaces useIsFlyoutActive,
 * useHasChildFlyout, useFlyoutLayoutMode hooks).
 */
export const useFlyoutActivityStage = ({
  flyoutId,
  level,
  shouldAnimate = false,
}: UseFlyoutActivityStageParams) => {
  const ctx = useFlyoutManager();
  const state = ctx?.state;

  // Derive all needed values from single context read
  const sessions = state?.sessions;
  const currentSession = sessions
    ? sessions[sessions.length - 1] ?? null
    : null;
  const isActive =
    currentSession?.mainFlyoutId === flyoutId ||
    currentSession?.childFlyoutId === flyoutId;

  const session =
    state?.sessions.find(
      (s) => s.mainFlyoutId === flyoutId || s.childFlyoutId === flyoutId
    ) ?? null;
  const hasChild = !!session?.childFlyoutId;

  const layoutMode = state?.layoutMode ?? LAYOUT_MODE_SIDE_BY_SIDE;

  const stage: EuiFlyoutActivityStage =
    state?.flyouts.find((f) => f.flyoutId === flyoutId)?.activityStage ||
    (isActive ? STAGE_ACTIVE : STAGE_INACTIVE);

  const stageRef = useRef(stage);
  if (stageRef.current !== stage) {
    stageRef.current = stage;
  }

  const transitionTo = useCallback(
    (nextStage: EuiFlyoutActivityStage) => {
      ctx?.dispatch?.(setActivityStage(flyoutId, nextStage));
      stageRef.current = nextStage;
    },
    [ctx, flyoutId]
  );

  /**
   * 1. ACTIVE -> CLOSING (or INACTIVE when !shouldAnimate) when no longer the active flyout.
   * 2. INACTIVE -> RETURNING (or ACTIVE when !shouldAnimate) when it becomes active again.
   * 3. (Main only) ACTIVE + stacked + has child -> BACKGROUNDING (or BACKGROUNDED when !shouldAnimate).
   * 4. (Main only) BACKGROUNDED/BACKGROUNDING + (child gone OR side-by-side) -> RETURNING (or ACTIVE when !shouldAnimate).
   */
  useEffect(() => {
    const s = stageRef.current;
    let next: EuiFlyoutActivityStage | null = null;

    if (s === STAGE_ACTIVE && !isActive) {
      next = shouldAnimate ? STAGE_CLOSING : STAGE_INACTIVE;
    } else if (s === STAGE_INACTIVE && isActive) {
      next = shouldAnimate ? STAGE_RETURNING : STAGE_ACTIVE;
    } else if (
      level === LEVEL_MAIN &&
      isActive &&
      s === STAGE_ACTIVE &&
      hasChild &&
      layoutMode === LAYOUT_MODE_STACKED
    ) {
      next = shouldAnimate ? STAGE_BACKGROUNDING : STAGE_BACKGROUNDED;
    } else if (
      level === LEVEL_MAIN &&
      (s === STAGE_BACKGROUNDED || s === STAGE_BACKGROUNDING) &&
      (!hasChild || layoutMode === LAYOUT_MODE_SIDE_BY_SIDE)
    ) {
      next = shouldAnimate ? STAGE_RETURNING : STAGE_ACTIVE;
    }

    if (next && next !== s) {
      transitionTo(next);
    }
  }, [
    isActive,
    hasChild,
    layoutMode,
    level,
    shouldAnimate,
    transitionTo,
    stage,
  ]);

  /**
   * onAnimationEnd: browser signal when a CSS animation completes.
   * Calls transitionTo to move to the final stage (e.g. CLOSING -> INACTIVE).
   */
  const onAnimationEnd = useCallback(() => {
    const currentStage = stageRef.current;
    const nextStage = getNextStage(currentStage);
    if (nextStage && nextStage !== currentStage) {
      transitionTo(nextStage);
    }
  }, [transitionTo]);

  return { activityStage: stage, onAnimationEnd };
};

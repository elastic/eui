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
import {
  useFlyoutLayoutMode,
  useHasChildFlyout,
  useIsFlyoutActive,
} from './hooks';
import { setActivityStage } from './actions';
import { useFlyoutManager } from './provider';

export interface UseFlyoutActivityStageParams {
  flyoutId: string;
  level: EuiFlyoutLevel;
}

export interface UseFlyoutActivityStageReturn {
  activityStage: EuiFlyoutActivityStage;
  onAnimationEnd: () => void;
}

/**
 * Encapsulates all activity-stage transitions and animation-driven updates
 * for managed flyouts.
 */
export const useFlyoutActivityStage = ({
  flyoutId,
  level,
}: UseFlyoutActivityStageParams) => {
  const isActive = useIsFlyoutActive(flyoutId);
  const hasChild = useHasChildFlyout(flyoutId);
  const layoutMode = useFlyoutLayoutMode();
  const ctx = useFlyoutManager();

  const stage: EuiFlyoutActivityStage =
    ctx?.state.flyouts.find((f) => f.flyoutId === flyoutId)?.activityStage ||
    (isActive ? STAGE_ACTIVE : STAGE_INACTIVE);

  const stageRef = useRef(stage);
  if (stageRef.current !== stage) {
    stageRef.current = stage;
  }

  /**
   * 1. ACTIVE -> CLOSING when no longer the active flyout.
   * 2. INACTIVE -> RETURNING when it becomes active again (e.g., reopened or brought forward).
   * 3. (Main flyout only) ACTIVE + stacked + has child -> BACKGROUNDING (begin background animation).
   * 4. (Main only) BACKGROUNDED/BACKGROUNDING + (child gone OR side-by-side) -> RETURNING (bring main to foreground).
   *
   * Any stages that depend on animation end (OPENING, RETURNING, CLOSING, BACKGROUNDING) are finalized in `onAnimationEnd`.
   */
  useEffect(() => {
    const s = stageRef.current;
    let next: EuiFlyoutActivityStage | null = null;

    if (s === STAGE_ACTIVE && !isActive) next = STAGE_CLOSING;
    else if (s === STAGE_INACTIVE && isActive) {
      next = STAGE_RETURNING;
    } else if (
      level === LEVEL_MAIN &&
      isActive &&
      s === STAGE_ACTIVE &&
      hasChild &&
      layoutMode === LAYOUT_MODE_STACKED
    )
      next = STAGE_BACKGROUNDING;
    else if (
      level === LEVEL_MAIN &&
      (s === STAGE_BACKGROUNDED || s === STAGE_BACKGROUNDING) &&
      (!hasChild || layoutMode === LAYOUT_MODE_SIDE_BY_SIDE)
    )
      next = STAGE_RETURNING;

    if (next && next !== s) {
      ctx?.dispatch?.(setActivityStage(flyoutId, next));
      stageRef.current = next;
    }
  }, [isActive, hasChild, layoutMode, level, ctx, flyoutId, stage]);

  /**
   * Get the stage to transition to for given current stage.
   * Returns `null` if stage should remain unchanged.
   *
   * Stage transitions:
   *  - OPENING / RETURNING -> ACTIVE
   *  - CLOSING -> INACTIVE
   *  - BACKGROUNDING -> BACKGROUNDED
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
    }

    return null;
  };

  /**
   * onAnimationEnd event handler that must be passed to EuiFlyout.
   * It handles transitions between stages and updates activity stage
   * in EuiFlyoutManagerContext.
   */
  const onAnimationEnd = useCallback(() => {
    const currentStage = stageRef.current;
    const nextStage = getNextStage(currentStage);

    if (nextStage && nextStage !== currentStage) {
      ctx?.dispatch?.(setActivityStage(flyoutId, nextStage));
      stageRef.current = nextStage;
    }
  }, [ctx, flyoutId]);

  return { activityStage: stage, onAnimationEnd };
};

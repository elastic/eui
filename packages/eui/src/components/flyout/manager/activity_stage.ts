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
export const useFlyoutActivityStage = (
  params: UseFlyoutActivityStageParams
): UseFlyoutActivityStageReturn => {
  const { flyoutId, level } = params;

  const isActive = useIsFlyoutActive(flyoutId);
  const hasChild = useHasChildFlyout(flyoutId);
  const layoutMode = useFlyoutLayoutMode();
  const context = useFlyoutManager();

  const activityStage: EuiFlyoutActivityStage = (context?.state.flyouts.find(
    (f) => f.flyoutId === flyoutId
  )?.activityStage ||
    (isActive ? STAGE_ACTIVE : STAGE_OPENING)) as EuiFlyoutActivityStage;

  // Layout mode transitions that affect main flyout behavior
  const activityStageRef = useRef<EuiFlyoutActivityStage>(activityStage);

  useEffect(() => {
    activityStageRef.current = (context?.state.flyouts.find(
      (f) => f.flyoutId === flyoutId
    )?.activityStage || activityStage) as EuiFlyoutActivityStage;
  }, [context, flyoutId, activityStage]);

  const onAnimationEnd = useCallback(() => {
    const stage = activityStageRef.current;

    switch (stage) {
      case STAGE_OPENING:
      case STAGE_RETURNING:
        context?.dispatch?.(setActivityStage(flyoutId, STAGE_ACTIVE));
        break;
      case STAGE_CLOSING:
        context?.dispatch?.(setActivityStage(flyoutId, STAGE_INACTIVE));
        break;
      case STAGE_BACKGROUNDING:
        context?.dispatch?.(setActivityStage(flyoutId, STAGE_BACKGROUNDED));
        break;
    }
  }, [context, flyoutId]);

  // Open/close transitions based on whether the flyout is part of the active session
  useEffect(() => {
    const stage = activityStageRef.current;
    if (!isActive && stage === STAGE_ACTIVE) {
      context?.dispatch?.(setActivityStage(flyoutId, STAGE_CLOSING));
    } else if (isActive && stage === STAGE_INACTIVE) {
      context?.dispatch?.(setActivityStage(flyoutId, STAGE_RETURNING));
    }
  }, [context, flyoutId, isActive]);

  useEffect(() => {
    if (level !== LEVEL_MAIN || !isActive) {
      return;
    }

    const stage = activityStageRef.current;

    if (
      layoutMode === LAYOUT_MODE_SIDE_BY_SIDE &&
      (stage === STAGE_BACKGROUNDED || stage === STAGE_BACKGROUNDING)
    ) {
      context?.dispatch?.(setActivityStage(flyoutId, STAGE_RETURNING));
    }
  }, [context, flyoutId, level, layoutMode, isActive]);

  // When stacked, background the main if a child exists; return when the child closes
  useEffect(() => {
    if (level !== LEVEL_MAIN || !isActive) return;

    const currentStage = activityStageRef.current;

    if (
      hasChild &&
      layoutMode === LAYOUT_MODE_STACKED &&
      currentStage === STAGE_ACTIVE
    ) {
      context?.dispatch?.(setActivityStage(flyoutId, STAGE_BACKGROUNDING));
    } else if (
      !hasChild &&
      (currentStage === STAGE_BACKGROUNDED ||
        currentStage === STAGE_BACKGROUNDING)
    ) {
      context?.dispatch?.(setActivityStage(flyoutId, STAGE_RETURNING));
    }
  }, [context, flyoutId, level, isActive, layoutMode, hasChild]);

  return { activityStage, onAnimationEnd };
};

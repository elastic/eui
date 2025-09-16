/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useEffect, useRef } from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import {
  EuiFlyoutComponent,
  EuiFlyoutComponentProps,
} from '../flyout.component';
import { EuiFlyoutMenuProps } from '../flyout_menu';
import { EuiFlyoutMenuContext } from '../flyout_menu_context';
import { useFlyoutActivityStage } from './activity_stage';
import {
  LEVEL_CHILD,
  LEVEL_MAIN,
  PROPERTY_FLYOUT,
  PROPERTY_LAYOUT_MODE,
  PROPERTY_LEVEL,
} from './const';
import { EuiFlyoutIsManagedProvider } from './context';
import { euiManagedFlyoutStyles } from './flyout_managed.styles';
import { registerCallback, unregisterCallback } from './provider';
import {
  useFlyoutManager as _useFlyoutManager,
  useFlyoutId,
  useFlyoutLayoutMode,
  useIsFlyoutActive,
  useParentFlyoutSize,
  useCurrentSession,
} from './hooks';
import { EuiFlyoutLevel } from './types';
import {
  createValidationErrorMessage,
  isNamedSize,
  validateFlyoutTitle,
  validateManagedFlyoutSize,
  validateSizeCombination,
} from './validation';

/**
 * Props for `EuiManagedFlyout`, the internal persistent flyout used by
 * the manager. Extends base flyout props and requires a `level` to
 * distinguish `main` vs `child` behavior.
 */
export interface EuiManagedFlyoutProps extends EuiFlyoutComponentProps {
  level: EuiFlyoutLevel;
  flyoutMenuProps?: Omit<EuiFlyoutMenuProps, 'historyItems' | 'showBackButton'>;
  onActive?: () => void;
}

const useFlyoutManager = () => {
  const context = _useFlyoutManager();
  if (!context) {
    throw new Error('EuiManagedFlyout must be used within an EuiFlyoutManager');
  }
  return context;
};

type CloseEvent = MouseEvent | TouchEvent | KeyboardEvent;

/**
 * Persistent managed flyout rendered inside the provider. Handles:
 * - registration/unregistration with the manager
 * - size validation and parent/child size compatibility
 * - width tracking for responsive layouts
 * - lifecycle stage transitions and data attributes for styling
 */
export const EuiManagedFlyout = ({
  id,
  onClose: onCloseProp,
  level,
  size,
  css: customCss,
  flyoutMenuProps: _flyoutMenuProps,
  onActive,
  ...props
}: EuiManagedFlyoutProps) => {
  const flyoutId = useFlyoutId(id);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const { addFlyout, closeFlyout, setFlyoutWidth, goBack, getHistoryItems } =
    useFlyoutManager();
  const isActive = useIsFlyoutActive(flyoutId);
  const parentSize = useParentFlyoutSize(flyoutId);
  const currentSession = useCurrentSession();
  const layoutMode = useFlyoutLayoutMode();
  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);

  // Validate size
  const sizeTypeError = validateManagedFlyoutSize(size, flyoutId, level);
  if (sizeTypeError) {
    throw new Error(createValidationErrorMessage(sizeTypeError));
  }

  // For child flyouts, validate parent-child combinations
  if (
    level === LEVEL_CHILD &&
    parentSize &&
    isNamedSize(size) &&
    isNamedSize(parentSize)
  ) {
    const combinationError = validateSizeCombination(parentSize, size);
    if (combinationError) {
      combinationError.flyoutId = flyoutId;
      combinationError.level = level;
      throw new Error(createValidationErrorMessage(combinationError));
    }
  }

  // Validate title
  const title = _flyoutMenuProps?.title || props['aria-label'];
  const titleError = validateFlyoutTitle(title, flyoutId, level);
  if (titleError) {
    throw new Error(createValidationErrorMessage(titleError));
  }

  // Track whether the onClose callback has already been called to prevent double-firing
  const onCloseCalledRef = useRef<boolean>(false);

  // Stabilize the unregister callback to prevent unnecessary re-registrations
  const onCloseCallbackRef = useRef<((e?: CloseEvent) => void) | undefined>();
  onCloseCallbackRef.current = (e) => {
    if (!onCloseCalledRef.current && onCloseProp) {
      onCloseCalledRef.current = true;
      const event = e || new MouseEvent('click');
      onCloseProp(event);
    }
  };

  // Stabilize the onActive callback to prevent unnecessary re-registrations
  const onActiveCallbackRef = useRef<(() => void) | undefined>();
  onActiveCallbackRef.current = onActive;

  // Register/unregister with flyout manager context
  useEffect(() => {
    if (onCloseCallbackRef.current) {
      registerCallback(flyoutId, 'onClose', onCloseCallbackRef.current);
    }

    if (onActiveCallbackRef.current) {
      registerCallback(flyoutId, 'onActive', onActiveCallbackRef.current);
    }

    addFlyout(flyoutId, title!, level, size as string);

    return () => {
      closeFlyout(flyoutId);
    };
  }, [size, flyoutId, title, level, addFlyout, closeFlyout]);

  // Monitor current session changes and fire onActive callback when this flyout becomes active
  useEffect(() => {
    if (!onActiveCallbackRef.current) {
      // no callback, no need to monitor sessions
      return;
    }

    if (!currentSession) {
      // skip session checks if there's no active session
      return;
    }

    const isInCurrentSession =
      currentSession.main === flyoutId || currentSession.child === flyoutId;

    if (isInCurrentSession) {
      onActiveCallbackRef.current();
    }
  }, [currentSession, flyoutId, level]);

  useEffect(() => {
    return () => {
      // Defer unregistration to allow calling the "onClose" callback to execute first
      setTimeout(() => {
        unregisterCallback(flyoutId, 'onClose');
        unregisterCallback(flyoutId, 'onActive');
      }, 0);
    };
  }, [flyoutId]);

  // Track width changes for flyouts
  const { width } = useResizeObserver(
    isActive ? flyoutRef.current : null,
    'width'
  );

  const onClose = (e?: CloseEvent) => {
    onCloseCallbackRef.current?.(e);
  };

  // Update width in manager state when it changes
  useEffect(() => {
    if (isActive && width) {
      setFlyoutWidth(flyoutId, width);
    }
  }, [flyoutId, level, isActive, width, setFlyoutWidth]);

  const { activityStage, onAnimationEnd } = useFlyoutActivityStage({
    flyoutId,
    level,
  });

  // Get titles and flyoutIds from the manager's flyouts state
  let showBackButton = false;
  let backButtonProps: EuiFlyoutMenuProps['backButtonProps'] | undefined;
  let historyItems: EuiFlyoutMenuProps['historyItems'] | undefined;

  // History controls are only relevant for main flyouts
  if (level === LEVEL_MAIN) {
    historyItems = getHistoryItems();
    showBackButton = historyItems.length > 0;
    backButtonProps = {
      onClick: goBack,
    };
  }

  const flyoutMenuProps = {
    ..._flyoutMenuProps,
    historyItems,
    showBackButton,
    backButtonProps,
    title,
  };

  return (
    <EuiFlyoutIsManagedProvider isManaged={true}>
      <EuiFlyoutMenuContext.Provider value={{ onClose }}>
        <EuiFlyoutComponent
          id={flyoutId}
          ref={flyoutRef}
          css={[
            styles.managedFlyout,
            customCss,
            styles.stage(activityStage, props.side),
          ]}
          {...{
            ...props,
            onClose,
            size,
            flyoutMenuProps,
            onAnimationEnd,
            [PROPERTY_FLYOUT]: true,
            [PROPERTY_LAYOUT_MODE]: layoutMode,
            [PROPERTY_LEVEL]: level,
          }}
        />
      </EuiFlyoutMenuContext.Provider>
    </EuiFlyoutIsManagedProvider>
  );
};

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

  console.log(
    `[FLYOUT DEBUG] EuiManagedFlyout render: ${flyoutId} (level: ${level})`
  );

  const { addFlyout, closeFlyout, setFlyoutWidth, goBack, getHistoryItems } =
    useFlyoutManager();

  const isActive = useIsFlyoutActive(flyoutId);
  const parentSize = useParentFlyoutSize(flyoutId);
  const currentSession = useCurrentSession();

  // Get layout mode for responsive behavior
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
  const unregisterCallbackRef = useRef<
    ((event?: MouseEvent | TouchEvent | KeyboardEvent) => void) | undefined
  >();
  unregisterCallbackRef.current = (eventArg) => {
    if (!onCloseCalledRef.current && onCloseProp) {
      console.log(
        `[FLYOUT DEBUG] executing onClose callback for: ${flyoutId} (from unregister callback)`
      );
      onCloseCalledRef.current = true;
      const event =
        eventArg ||
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
      onCloseProp(event);
    }
  };

  // Stabilize the onActive callback to prevent unnecessary re-registrations
  const onActiveCallbackRef = useRef<(() => void) | undefined>();
  onActiveCallbackRef.current = onActive;

  // Track the previous session to avoid calling onActive multiple times for the same session
  const previousSessionRef = useRef<typeof currentSession>(null);

  // Register/unregister with flyout manager context
  useEffect(() => {
    console.log(
      `[FLYOUT DEBUG] useEffect (registration) running for: ${flyoutId}`
    );
    // Register the unregister callback in the registry
    if (unregisterCallbackRef.current) {
      console.log(
        `[FLYOUT DEBUG] registering onClose callback for: ${flyoutId}`
      );
      registerCallback(flyoutId, 'onClose', unregisterCallbackRef.current);
    } else {
      console.log(
        `[FLYOUT DEBUG] no onClose callback to register for: ${flyoutId}`
      );
    }

    // Register the onActive callback in the registry
    if (onActiveCallbackRef.current) {
      console.log(
        `[FLYOUT DEBUG] registering onActive callback for: ${flyoutId}`
      );
      registerCallback(flyoutId, 'onActive', onActiveCallbackRef.current);
    } else {
      console.log(
        `[FLYOUT DEBUG] no onActive callback to register for: ${flyoutId}`
      );
    }

    console.log(`[FLYOUT DEBUG] calling addFlyout for: ${flyoutId}`);
    addFlyout(flyoutId, title!, level, size as string);

    return () => {
      console.log(
        `[FLYOUT DEBUG] useEffect (registration) cleanup for: ${flyoutId}`
      );
      closeFlyout(flyoutId);
      // Don't unregister callbacks here - let the reducer handle it
      // The reducer will call the callbacks and then we can unregister them
    };
  }, [size, flyoutId, title, level, addFlyout, closeFlyout]);

  // Monitor current session changes and fire onActive callback when this flyout becomes active
  // Only run this effect if we have an onActive callback to avoid unnecessary work
  useEffect(() => {
    // Early exit if no callback - no need to monitor sessions
    if (!onActiveCallbackRef.current) {
      return;
    }

    console.log(
      `[FLYOUT DEBUG] useEffect (session monitoring) running for: ${flyoutId}`,
      {
        currentSession,
        hasOnActiveCallback: !!onActiveCallbackRef.current,
      }
    );

    if (!currentSession) {
      console.log(
        `[FLYOUT DEBUG] skipping session check for: ${flyoutId} (no session)`
      );
      return;
    }

    // Check if this flyout is part of the current active session
    const isInCurrentSession =
      currentSession.main === flyoutId || currentSession.child === flyoutId;

    // Check if the session has actually changed in a way that affects this flyout
    const previousSession = previousSessionRef.current;
    const sessionChanged =
      !previousSession ||
      previousSession.main !== currentSession.main ||
      previousSession.child !== currentSession.child;

    // Only fire onActive if this flyout is newly part of the active session
    const wasInPreviousSession =
      previousSession &&
      (previousSession.main === flyoutId || previousSession.child === flyoutId);

    // For main flyouts: only fire onActive if this is a new session (different main flyout)
    // For child flyouts: fire onActive if this is the first time they're added to a session
    const isNewlyActive =
      isInCurrentSession &&
      (!wasInPreviousSession || // First time this flyout is part of any session
        (level === 'main' &&
          previousSession &&
          previousSession.main !== currentSession.main) || // Main flyout: different session
        (level === 'child' &&
          previousSession &&
          previousSession.child !== currentSession.child)); // Child flyout: different child

    console.log(`[FLYOUT DEBUG] session check for: ${flyoutId}`, {
      isInCurrentSession,
      wasInPreviousSession,
      isNewlyActive,
      sessionChanged,
      previousSession,
      currentSession,
    });

    if (isNewlyActive) {
      console.log(`[FLYOUT DEBUG] firing onActive callback for: ${flyoutId}`);
      // Fire the onActive callback when this flyout becomes part of the active session
      onActiveCallbackRef.current();
    }

    // Update the previous session reference
    previousSessionRef.current = currentSession;
  }, [currentSession, flyoutId, level]);

  // Clean up callbacks when component unmounts
  useEffect(() => {
    return () => {
      console.log(`[FLYOUT DEBUG] component unmount cleanup for: ${flyoutId}`);
      // Defer unregistration to allow callUnregisterCallback to execute first
      // Use setTimeout with 0 delay to ensure it runs after microtasks
      setTimeout(() => {
        console.log(`[FLYOUT DEBUG] delayed unregistration for: ${flyoutId}`);
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

  const onClose = (event?: MouseEvent | TouchEvent | KeyboardEvent) => {
    unregisterCallbackRef.current?.(event);
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

  // History controls are only relevant for main flyouts
  // Get titles and flyoutIds from the manager's flyouts state
  let showBackButton = false;
  let backButtonProps: EuiFlyoutMenuProps['backButtonProps'] | undefined;
  let historyItems: EuiFlyoutMenuProps['historyItems'] | undefined;
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

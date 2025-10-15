/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import {
  EuiFlyoutComponent,
  EuiFlyoutComponentProps,
} from '../flyout.component';
import { EuiFlyoutMenuProps } from '../flyout_menu';
import { EuiFlyoutMenuContext } from '../flyout_menu_context';
import type { EuiFlyoutCloseEvent } from '../types';
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
import {
  useFlyoutManager as _useFlyoutManager,
  useCurrentSession,
  useFlyoutId,
  useFlyoutLayoutMode,
  useIsFlyoutActive,
  useParentFlyoutSize,
} from './hooks';
import { useCurrentMainFlyout, useIsFlyoutRegistered } from './selectors';
import type { EuiFlyoutLevel } from './types';
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
  onActive: onActiveProp,
  level,
  size: sizeProp,
  css: customCss,
  flyoutMenuProps: _flyoutMenuProps,
  ...props
}: EuiManagedFlyoutProps) => {
  const flyoutId = useFlyoutId(id);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const {
    addFlyout,
    closeFlyout,
    setFlyoutWidth,
    goBack,
    historyItems: _historyItems,
  } = useFlyoutManager();
  const parentSize = useParentFlyoutSize(flyoutId);
  const parentFlyout = useCurrentMainFlyout();
  const layoutMode = useFlyoutLayoutMode();
  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);

  // Set default size based on level: main defaults to 'm', child defaults to 's'
  const size = sizeProp ?? (level === LEVEL_CHILD ? 's' : 'm');

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
      combinationError.parentFlyoutId = parentFlyout?.flyoutId;
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

  const isActive = useIsFlyoutActive(flyoutId);
  const currentSession = useCurrentSession();
  const flyoutExistsInManager = useIsFlyoutRegistered(flyoutId);

  // Stabilize the onClose callback
  const onCloseCallbackRef = useRef<
    ((e?: EuiFlyoutCloseEvent) => void) | undefined
  >();
  onCloseCallbackRef.current = (e) => {
    if (onCloseProp) {
      const event = e || new MouseEvent('click');
      onCloseProp(event);
    }
  };

  // Stabilize the onActive callback
  const onActiveCallbackRef = useRef<(() => void) | undefined>();
  onActiveCallbackRef.current = onActiveProp;

  // Track if flyout was ever registered to avoid false positives on initial mount
  const wasRegisteredRef = useRef(false);

  // Register with flyout manager context when open, remove when closed
  useEffect(() => {
    addFlyout(flyoutId, title!, level, size as string);

    return () => {
      closeFlyout(flyoutId);

      // Reset navigation tracking when explicitly closed via isOpen=false
      wasRegisteredRef.current = false;
    };
  }, [flyoutId, title, level, size, addFlyout, closeFlyout]);

  // Detect when flyout has been removed from manager state (e.g., via Back button)
  // and trigger onClose callback to notify the parent component
  useEffect(() => {
    if (flyoutExistsInManager) {
      wasRegisteredRef.current = true;
    }

    // If flyout was previously registered, is marked as open, but no longer exists in manager state,
    // it was removed via navigation (Back button) - trigger close callback
    if (wasRegisteredRef.current && !flyoutExistsInManager) {
      onCloseCallbackRef.current?.(new MouseEvent('navigation'));
      wasRegisteredRef.current = false; // Reset to avoid repeated calls
    }
  }, [flyoutExistsInManager, flyoutId]);

  // Monitor current session changes and fire onActive callback when this flyout becomes active
  useEffect(() => {
    if (!onActiveCallbackRef.current || !currentSession) {
      return;
    }

    // Make sure callback is only fired for the flyout that changed
    const mainChanged =
      level === LEVEL_MAIN && currentSession.mainFlyoutId === flyoutId;
    const childChanged =
      level === LEVEL_CHILD && currentSession.childFlyoutId === flyoutId;

    if (mainChanged || childChanged) {
      onActiveCallbackRef.current();
    }
  }, [currentSession, flyoutId, level]);

  useEffect(() => {
    return () => {
      // Only remove from manager on component unmount, don't trigger close callback
      closeFlyout(flyoutId);
    };
  }, [closeFlyout, flyoutId]);

  // Track width changes for flyouts
  const { width } = useResizeObserver(
    isActive ? flyoutRef.current : null,
    'width'
  );

  // Pass the stabilized onClose callback to the flyout menu context
  const onClose = (e?: EuiFlyoutCloseEvent) => {
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

  // Note: history controls are only relevant for main flyouts
  const historyItems = useMemo(() => {
    const result = level === LEVEL_MAIN ? _historyItems : undefined;
    return result;
  }, [level, _historyItems]);

  const backButtonProps = useMemo(() => {
    return level === LEVEL_MAIN ? { onClick: goBack } : undefined;
  }, [level, goBack]);

  const showBackButton = historyItems ? historyItems.length > 0 : false;

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
            styles.stage(activityStage, props.side, level),
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

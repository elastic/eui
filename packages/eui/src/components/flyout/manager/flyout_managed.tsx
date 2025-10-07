/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useEffect, useState, useRef } from 'react';
import { useEuiMemoizedStyles } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { useInnerText } from '../../inner_text/inner_text';
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
import { useIsFlyoutRegistered } from './selectors';
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
  size = 'm',
  css: customCss,
  isOpen = true,
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
    updateFlyoutTitle,
  } = useFlyoutManager();
  const parentSize = useParentFlyoutSize(flyoutId);
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

  const [title, setTitle] = useState(
    _flyoutMenuProps?.title || props['aria-label']
  );

  // Use useInnerText to observe title changes from aria-labelledby element
  const [setLabelledByRef, labelledByText] = useInnerText();

  // Set up the ref for the aria-labelledby element when it's available
  const ariaLabelledBy = props['aria-labelledby'];
  useEffect(() => {
    // Only try to find the element when the flyout is open
    if (ariaLabelledBy && isOpen) {
      const tryFindElement = () => {
        const domEl = document.getElementById(ariaLabelledBy);
        if (domEl) {
          setLabelledByRef(domEl);
          return true;
        }
        return false;
      };

      // Try immediately first
      if (!tryFindElement()) {
        // Retry after a short delay to allow for DOM rendering
        retryTimerRef.current = setTimeout(() => {
          if (!tryFindElement()) {
            // Element not found after retry - this is expected in some cases
          }
        }, 500); // Delay to allow for flyout content rendering

        return () => {
          if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
            retryTimerRef.current = null;
          }
        };
      }
    }
  }, [ariaLabelledBy, setLabelledByRef, flyoutId, isOpen]);

  // Update title when labelledByText changes
  // Use aria-labelledby as fallback when no explicit title is provided
  const ariaLabel = props['aria-label'];
  const explicitTitle = _flyoutMenuProps?.title;

  // Track the last processed title to prevent infinite loops
  const lastProcessedTitleRef = useRef<string | null>(null);

  // Track retry timer to clear it when text changes
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear retry timer if we got text (element was found and is being observed)
    if (labelledByText && retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    // Only update if we have new text and haven't processed this exact title before
    if (
      labelledByText &&
      !explicitTitle &&
      !ariaLabel &&
      labelledByText !== lastProcessedTitleRef.current
    ) {
      const discoveredTitle = labelledByText || 'Untitled';

      // Mark this title as processed to prevent re-processing
      lastProcessedTitleRef.current = labelledByText;

      setTitle(discoveredTitle);
      updateFlyoutTitle(flyoutId, discoveredTitle);
    }
  }, [
    labelledByText,
    explicitTitle,
    ariaLabel,
    flyoutId,
    updateFlyoutTitle,
    title,
    manager,
  ]);

  // Validate title
  const titleError = validateFlyoutTitle(title, flyoutId, level);
  if (titleError) {
    console.warn('⚠️ Title validation error:', {
      flyoutId,
      level,
      title,
      error: titleError.message,
    });
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
    if (isOpen) {
      addFlyout?.(flyoutId, title!, level, size as string);
    } else {
      closeFlyout?.(flyoutId);
      // Reset navigation tracking when explicitly closed via isOpen=false
      wasRegisteredRef.current = false;
    }
  }, [isOpen, flyoutId, title, level, size, addFlyout, closeFlyout]);

  // Detect when flyout has been removed from manager state (e.g., via Back button)
  // and trigger onClose callback to notify the parent component
  useEffect(() => {
    if (isOpen && flyoutExistsInManager) {
      wasRegisteredRef.current = true;
    }

    // If flyout was previously registered, is marked as open, but no longer exists in manager state,
    // it was removed via navigation (Back button) - trigger close callback
    if (wasRegisteredRef.current && isOpen && !flyoutExistsInManager) {
      onCloseCallbackRef.current?.(new MouseEvent('navigation'));
      wasRegisteredRef.current = false; // Reset to avoid repeated calls
    }
  }, [flyoutExistsInManager, isOpen, flyoutId]);

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
      closeFlyout?.(flyoutId);
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
      setFlyoutWidth?.(flyoutId, width);
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
            isOpen,
            [PROPERTY_FLYOUT]: true,
            [PROPERTY_LAYOUT_MODE]: layoutMode,
            [PROPERTY_LEVEL]: level,
          }}
        />
      </EuiFlyoutMenuContext.Provider>
    </EuiFlyoutIsManagedProvider>
  );
};

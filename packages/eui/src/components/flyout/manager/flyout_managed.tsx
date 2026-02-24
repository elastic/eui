/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { flushSync } from 'react-dom';
import { useCombinedRefs, useEuiMemoizedStyles } from '../../../services';
import { useEuiI18n } from '../../i18n';
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
export const EuiManagedFlyout = forwardRef<HTMLElement, EuiManagedFlyoutProps>(
  (
    {
      id,
      onClose: onCloseProp,
      onActive: onActiveProp,
      level,
      size: sizeProp,
      css: customCss,
      flyoutMenuProps: _flyoutMenuProps,
      ...props
    },
    ref
  ) => {
    const flyoutId = useFlyoutId(id);
    const [flyoutRef, setFlyoutRef] = useState<HTMLElement | null>(null);

    const refs = useMemo(() => [setFlyoutRef, ref], [ref]);
    const combinedRef = useCombinedRefs(refs);

    const {
      addFlyout,
      closeFlyout,
      closeAllFlyouts,
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

    const defaultTitle = useEuiI18n(
      'euiFlyoutManaged.defaultTitle',
      'Unknown Flyout'
    );

    // Set title from flyoutMenuProps or aria-label
    // TODO: allow aria-labelledby references to be used
    let title = _flyoutMenuProps?.title || props['aria-label'];
    if (
      process.env.NODE_ENV === 'development' &&
      level === LEVEL_MAIN &&
      !title
    ) {
      console.warn(
        `Managed flyout "${flyoutId}" requires a title, which can be provided through 'flyoutMenuProps.title' or 'aria-label'. Using default title: "${defaultTitle}"`
      );
      title = defaultTitle;
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

    // Track flyoutExistsInManager in a ref to avoid dependency loop
    // The cleanup function needs the current value but shouldn't cause re-runs
    const flyoutExistsInManagerRef = useRef(flyoutExistsInManager);

    // Update ref when flyoutExistsInManager changes
    useEffect(() => {
      flyoutExistsInManagerRef.current = flyoutExistsInManager;
    }, [flyoutExistsInManager]);

    // Register with flyout manager context when open, remove when closed
    // Using useLayoutEffect to run synchronously before DOM updates
    useLayoutEffect(() => {
      addFlyout(flyoutId, title!, level, size as string);

      return () => {
        // Only call closeFlyout if it wasn't already called via onClose
        // This prevents duplicate removal when using Escape/X button
        if (flyoutExistsInManagerRef.current) {
          level === LEVEL_MAIN ? closeAllFlyouts() : closeFlyout(flyoutId);
        }

        // Reset navigation tracking when explicitly closed via isOpen=false
        wasRegisteredRef.current = false;
      };
    }, [flyoutId, title, level, size, addFlyout, closeFlyout, closeAllFlyouts]);

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

    // Track width changes for flyouts
    const { width } = useResizeObserver(isActive ? flyoutRef : null, 'width');

    // Pass the stabilized onClose callback to the flyout menu context
    const onClose = (e?: EuiFlyoutCloseEvent) => {
      // CRITICAL: Update manager state FIRST before allowing React to unmount
      // This prevents race conditions during portal → inline DOM transitions
      // and ensures cascade close logic runs before DOM cleanup begins
      // Using flushSync to force synchronous state update completion
      flushSync(() => {
        level === LEVEL_MAIN ? closeAllFlyouts() : closeFlyout(flyoutId);
      });

      // trigger parent callback, unmounts the component
      if (onCloseCallbackRef.current) {
        const event = e || new MouseEvent('click');
        onCloseCallbackRef.current(event);
      }
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
            ref={combinedRef}
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
  }
);

EuiManagedFlyout.displayName = 'EuiManagedFlyout';

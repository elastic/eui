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
  PROPERTY_FLYOUT,
  PROPERTY_LAYOUT_MODE,
  PROPERTY_LEVEL,
} from './const';
import { EuiFlyoutIsManagedProvider } from './context';
import { euiManagedFlyoutStyles } from './flyout_managed.styles';
import {
  useFlyoutManager as _useFlyoutManager,
  useFlyoutId,
  useFlyoutLayoutMode,
  useIsFlyoutActive,
  useParentFlyoutSize,
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
  flyoutMenuProps?: EuiFlyoutMenuProps;
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
  isOpen = true,
  flyoutMenuProps: _flyoutMenuProps,
  ...props
}: EuiManagedFlyoutProps) => {
  const flyoutId = useFlyoutId(id);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const { addFlyout, closeFlyout, setFlyoutWidth } = useFlyoutManager();

  const isActive = useIsFlyoutActive(flyoutId);
  const parentSize = useParentFlyoutSize(flyoutId);

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

  // Register/unregister with flyout manager context
  useEffect(() => {
    if (isOpen) {
      addFlyout(flyoutId, title!, level, size as string);

      return () => closeFlyout(flyoutId);
    }
  }, [isOpen, flyoutId, size, title, level, addFlyout, closeFlyout]);

  // Track width changes for flyouts
  const { width } = useResizeObserver(
    isActive ? flyoutRef.current : null,
    'width'
  );

  const onClose = (event?: MouseEvent | TouchEvent | KeyboardEvent) => {
    onCloseProp(event);
    closeFlyout(flyoutId);
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

  const flyoutMenuProps = {
    ..._flyoutMenuProps,
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

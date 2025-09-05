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
  level,
  size,
  css: _css,
  flyoutMenuProps: _flyoutMenuProps,
  onClose: _onClose,
  ...props
}: EuiManagedFlyoutProps) => {
  const flyoutId = useFlyoutId(id);
  const { addFlyout, closeFlyout, setFlyoutWidth } = useFlyoutManager();
  const parentSize = useParentFlyoutSize(flyoutId);

  /**
   * Validate size and title props
   */

  const sizeTypeError = validateManagedFlyoutSize(size, flyoutId, level);
  if (sizeTypeError) {
    throw new Error(createValidationErrorMessage(sizeTypeError));
  }

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

  const title = _flyoutMenuProps?.title || props['aria-label'];
  const titleError = validateFlyoutTitle(title, flyoutId, level);
  if (titleError) {
    throw new Error(createValidationErrorMessage(titleError));
  }

  // Register/unregister with flyout manager context
  useEffect(() => {
    addFlyout(flyoutId, level, size as string);
    return () => {
      closeFlyout(flyoutId);
    };
  }, [size, flyoutId, level, parentSize, addFlyout, closeFlyout, title]);

  /**
   * Width tracking for responsive layouts
   */

  const flyoutRef = useRef<HTMLDivElement>(null);
  const isActive = useIsFlyoutActive(flyoutId);
  const { width } = useResizeObserver(
    isActive ? flyoutRef.current : null,
    'width'
  );

  useEffect(() => {
    if (isActive && width) {
      setFlyoutWidth(flyoutId, width);
    }
  }, [flyoutId, level, isActive, width, setFlyoutWidth]);

  /*
   * Other props for the internal flyout component
   */

  const onClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    _onClose(event);
    closeFlyout(flyoutId);
  };

  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);
  const { activityStage, onAnimationEnd } = useFlyoutActivityStage({
    flyoutId,
    level,
  });

  const flyoutMenuProps = {
    ..._flyoutMenuProps,
    title,
  };

  const layoutMode = useFlyoutLayoutMode();

  return (
    <EuiFlyoutIsManagedProvider isManaged={true}>
      <EuiFlyoutMenuContext.Provider value={{ onClose }}>
        <EuiFlyoutComponent
          id={flyoutId}
          ref={flyoutRef}
          css={[
            styles.managedFlyout,
            _css,
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

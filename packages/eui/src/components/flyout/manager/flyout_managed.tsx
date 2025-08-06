/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  EuiFlyoutComponent,
  EuiFlyoutComponentProps,
} from '../flyout.component';
import {
  useFlyoutManager as _useFlyoutManager,
  useIsFlyoutActive,
  EuiManagedFlyoutContext,
  useParentFlyoutSize,
  useFlyoutLayoutMode,
  // useCurrentChildFlyout,
} from './flyout_manager';
import { useEuiMemoizedStyles } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { euiManagedFlyoutStyles } from './flyout_managed.styles';
import { EuiFlyoutMenuContext } from '../flyout_menu_context';
import {
  validateManagedFlyoutSize,
  validateSizeCombination,
  createValidationErrorMessage,
  isNamedSize,
} from './flyout_validation';
import { useFlyoutId } from './hooks';

export interface EuiManagedFlyoutProps extends EuiFlyoutComponentProps {
  level: 'main' | 'child';
}

const useFlyoutManager = () => {
  const context = _useFlyoutManager();
  if (!context) {
    throw new Error('EuiManagedFlyout must be used within an EuiFlyoutManager');
  }
  return context;
};

// The persistent component that renders in the provider
export const EuiManagedFlyout = ({
  id,
  onClose: onCloseProp,
  level,
  size,
  css: customCss,
  ...props
}: EuiManagedFlyoutProps) => {
  const flyoutId = useFlyoutId(id);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState<
    'opening' | 'active' | 'inactive' | 'returning' | 'closing'
  >('opening');

  const { addFlyout, closeFlyout, setFlyoutWidth } = useFlyoutManager();

  const isActive = useIsFlyoutActive(flyoutId);
  const parentSize = useParentFlyoutSize(flyoutId);

  // Get layout mode for responsive behavior
  const layoutMode = useFlyoutLayoutMode();

  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);

  // Validate size and add flyout
  useEffect(() => {
    // Validate that managed flyouts use named sizes (s, m, l)
    const sizeTypeError = validateManagedFlyoutSize(size, flyoutId, level);
    if (sizeTypeError) {
      throw new Error(createValidationErrorMessage(sizeTypeError));
    }

    // For child flyouts, validate parent-child combinations
    if (
      level === 'child' &&
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

    addFlyout(flyoutId, level, size as string);
    return () => {
      closeFlyout(flyoutId);
    };
  }, [size, flyoutId, level, parentSize, addFlyout, closeFlyout]);

  // Track width changes for flyouts
  const { width } = useResizeObserver(
    isActive ? flyoutRef.current : null,
    'width'
  );

  const onClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    onCloseProp(event);
    closeFlyout(flyoutId);
  };

  // Update width in manager state when it changes
  useEffect(() => {
    if (isActive && width) {
      setFlyoutWidth(flyoutId, width);
    }
  }, [flyoutId, level, isActive, width, setFlyoutWidth]);

  const handleAnimationEnd = () => {
    if (activeState === 'opening' || activeState === 'returning') {
      setActiveState('active');
    } else if (activeState === 'closing') {
      setActiveState('inactive');
    }
  };

  useEffect(() => {
    if (!isActive && activeState === 'active') {
      setActiveState('closing');
    } else if (isActive && activeState === 'inactive') {
      setActiveState('returning');
    }
  }, [isActive, activeState]);

  // TODO: @tsullivan This is a bug.
  //
  // If the layout mode switches to 'stacked' and the main flyout switches to size 's',
  // it's width brings the combined width _below_ the 90% threshold.  This causes an
  // infinite loop in the browser at certain widths.

  /*

  const childFlyout = useCurrentChildFlyout();
  const childSize = childFlyout?.size as 's' | 'm' | undefined;

  if (layoutMode === 'stacked' && childSize === 's') {
    size = 's'; // Force main size to 's' if in stacked mode and child size is 's'
  }

  */

  return (
    <EuiManagedFlyoutContext.Provider value={true}>
      <EuiFlyoutMenuContext.Provider value={{ onClose }}>
        <EuiFlyoutComponent
          id={flyoutId}
          ref={flyoutRef}
          data-managed-flyout={true}
          data-managed-flyout-level={level}
          data-managed-flyout-active={activeState}
          data-layout-mode={layoutMode}
          onClose={onClose}
          css={[styles.managedFlyout, customCss]}
          onAnimationEnd={handleAnimationEnd}
          size={size}
          {...props}
        />
      </EuiFlyoutMenuContext.Provider>
    </EuiManagedFlyoutContext.Provider>
  );
};

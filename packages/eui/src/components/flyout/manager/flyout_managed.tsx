/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useId, useRef } from 'react';
import {
  EuiFlyoutComponent,
  EuiFlyoutComponentProps,
} from '../flyout.component';
import {
  useFlyoutManager,
  useIsFlyoutActive,
  EuiManagedFlyoutContext,
} from './flyout_manager';
import { useEuiMemoizedStyles } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { euiManagedFlyoutStyles } from './flyout.styles';
import { EuiFlyoutMenuContext } from '../flyout_menu_context';

export interface EuiManagedFlyoutProps extends EuiFlyoutComponentProps {
  level: 'main' | 'child';
}

// The persistent component that renders in the provider
export const EuiManagedFlyout = ({
  id,
  onClose: onCloseProp,
  level,
  css: customCss,
  ...props
}: EuiManagedFlyoutProps) => {
  const defaultId = useId();
  const componentIdRef = useRef<string>(id || `persistent-${defaultId}`);
  const flyoutId = componentIdRef.current;
  const flyoutRef = useRef<HTMLDivElement>(null);

  const isActive = useIsFlyoutActive(flyoutId);
  const { addFlyout, closeFlyout, setFlyoutWidth } = useFlyoutManager();

  const styles = useEuiMemoizedStyles(euiManagedFlyoutStyles);

  // Track width changes for main flyouts
  const { width } = useResizeObserver(
    level === 'main' && isActive ? flyoutRef.current : null,
    'width'
  );

  const onClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    onCloseProp(event);
    closeFlyout(flyoutId);
  };

  useEffect(() => {
    addFlyout(flyoutId, level);
    return () => {
      closeFlyout(flyoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update width in manager state when it changes
  useEffect(() => {
    if (level === 'main' && isActive && width) {
      setFlyoutWidth(flyoutId, width);
    }
  }, [flyoutId, level, isActive, width, setFlyoutWidth]);

  return (
    <EuiManagedFlyoutContext.Provider value={true}>
      <EuiFlyoutMenuContext.Provider value={{ onClose }}>
        <EuiFlyoutComponent
          ref={flyoutRef}
          data-managed-flyout={true}
          data-managed-flyout-level={level}
          data-managed-flyout-active={isActive}
          id={componentIdRef.current}
          onClose={onClose}
          css={[styles.managedFlyout, customCss]}
          {...props}
        />
      </EuiFlyoutMenuContext.Provider>
    </EuiManagedFlyoutContext.Provider>
  );
};

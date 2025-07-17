/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useRef } from 'react';
import {
  useFlyoutManager,
  useIsRegistered,
  useIsActive,
} from './flyout_manager';
import {
  EuiFlyout as EuiFlyoutMain,
  EuiFlyoutProps as EuiFlyoutMainProps,
} from '../flyout';
import { EuiFlyoutChild, type EuiFlyoutChildProps } from '../flyout_child';

/**
 * Props for a main (top-level) managed flyout.
 */
interface MainFlyoutProps extends EuiFlyoutMainProps {
  level?: 'main';
}

/**
 * Props for a child (nested) managed flyout.
 */
interface ChildFlyoutProps extends EuiFlyoutChildProps {
  level?: 'child';
}

/**
 * Base props for a managed flyout (either main or child).
 */
export type EuiFlyoutManagedBaseProps = MainFlyoutProps | ChildFlyoutProps;

/**
 * Props for the EuiFlyoutManaged component.
 */
type EuiFlyoutManagedProps = {
  flyoutId: string;
} & EuiFlyoutManagedBaseProps;

/**
 * Type guard for child flyout props.
 */
function isChildFlyout(
  props: EuiFlyoutManagedBaseProps
): props is ChildFlyoutProps {
  return (props as any).level === 'child';
}

/**
 * EuiFlyoutManaged component. Handles registration, stacking, and lifecycle of a managed flyout.
 * Uses context to coordinate with the flyout manager.
 */
export const EuiFlyoutManaged = (props: EuiFlyoutManagedProps) => {
  const { addFlyout, closeFlyout } = useFlyoutManager();
  const isOpen = useRef(false);

  // Extract relevant props
  const { onClose, flyoutId } = props;
  const isActive = useIsActive(flyoutId);
  const isRegistered = useIsRegistered(flyoutId);

  // Register the flyout on mount, unregister on unmount
  useEffect(() => {
    addFlyout(flyoutId);
    return () => {
      closeFlyout(flyoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyoutId]);

  // Call onClose externally if the flyout transitions from present to absent
  useEffect(() => {
    if (!isOpen.current && isRegistered) {
      isOpen.current = true;
    }
    if (isOpen.current && !isRegistered) {
      onClose?.({ type: 'external', flyoutId } as any);
    }
  }, [flyoutId, isRegistered, isOpen, onClose]);

  // Only render if the flyout is active and registered
  if (!isActive || !isRegistered) {
    return null;
  }

  // Render a child or main flyout depending on props
  if (isChildFlyout(props)) {
    return <EuiFlyoutChild {...props} />;
  } else {
    const { flyoutId, ...rest } = props;
    return <EuiFlyoutMain {...rest} />;
  }
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ElementType, useRef, forwardRef } from 'react';
import {
  EuiFlyoutComponent,
  type EuiFlyoutComponentProps,
} from './flyout.component';
import {
  EuiFlyoutChild,
  EuiFlyoutMain,
  useIsSessionActive,
  useIsInManagedFlyout,
} from './manager';

export type {
  EuiFlyoutSize,
  _EuiFlyoutPaddingSize,
  _EuiFlyoutSide,
} from './const';

export {
  FLYOUT_SIDES,
  FLYOUT_PADDING_SIZES,
  FLYOUT_SIZES,
  FLYOUT_TYPES,
} from './const';

export { EuiFlyoutComponent } from './flyout.component';

export type EuiFlyoutProps<T extends ElementType = 'div' | 'nav'> = Omit<
  EuiFlyoutComponentProps<T>,
  'as'
> & {
  session?: boolean;
  as?: T;
};

export const EuiFlyout = forwardRef<
  HTMLDivElement | HTMLElement,
  EuiFlyoutProps<'div' | 'nav'>
>(({ session, as, onClose, ...props }, ref) => {
  const hasActiveSession = useIsSessionActive();
  const isUnmanagedFlyout = useRef(false);
  const isInManagedFlyout = useIsInManagedFlyout();

  // If session={true}, or there is an active session and the flyout is not a child of a session, render EuiMainFlyout.
  if (session === true || (hasActiveSession && !isInManagedFlyout)) {
    if (isUnmanagedFlyout.current) {
      // TODO: @tkajtoch - We need to find a better way to handle the missing event.
      onClose?.({} as any);
      return null;
    }
    return <EuiFlyoutMain {...props} onClose={onClose} as="div" />;
  }

  // Else if this flyout is a child of a session AND within a managed flyout context, render EuiChildFlyout.
  if (hasActiveSession && isInManagedFlyout) {
    return <EuiFlyoutChild {...props} onClose={onClose} as="div" />;
  }

  // TODO: if resizeable={true}, render EuiResizableFlyout.

  isUnmanagedFlyout.current = true;
  return <EuiFlyoutComponent {...props} onClose={onClose} as={as} ref={ref} />;
});
EuiFlyout.displayName = 'EuiFlyout';

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ElementType } from 'react';
import {
  EuiFlyoutComponent,
  type EuiFlyoutComponentProps,
} from './flyout.component';
import {
  EuiFlyoutChild,
  EuiFlyoutMain,
  useIsSessionActive,
  useIsManagedFlyoutContext,
} from './manager';

export type {
  EuiFlyoutSize,
  _EuiFlyoutPaddingSize,
  _EuiFlyoutSide,
} from './flyout.component';
export {
  SIDES,
  PADDING_SIZES,
  SIZES,
  TYPES,
  EuiFlyoutComponent,
} from './flyout.component';

export type EuiFlyoutProps<T extends ElementType = 'div' | 'nav'> = Omit<
  EuiFlyoutComponentProps<T>,
  'as'
> & {
  session?: boolean;
  as?: T;
};

// Type for session components that expect a fixed 'div' element
type SessionFlyoutProps = Omit<EuiFlyoutComponentProps<'div'>, 'as'>;

export const EuiFlyout = ({ session, as, ...props }: EuiFlyoutProps) => {
  const hasActiveSession = useIsSessionActive();
  const isInManagedFlyoutContext = useIsManagedFlyoutContext();

  // If session={true}, or there is an active session and the flyout is not a child of a session, render EuiMainFlyout.
  if (session === true || (hasActiveSession && !isInManagedFlyoutContext)) {
    return <EuiFlyoutMain {...(props as SessionFlyoutProps)} as="div" />;
  }

  // Else if this flyout is a child of a session AND within a managed flyout context, render EuiChildFlyout.
  if (hasActiveSession && isInManagedFlyoutContext) {
    return <EuiFlyoutChild {...(props as SessionFlyoutProps)} as="div" />;
  }

  // TODO: if resizeable={true}, render EuiResizableFlyout.

  return <EuiFlyoutComponent {...props} as={as} />;
};

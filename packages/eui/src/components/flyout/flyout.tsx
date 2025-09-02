/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, forwardRef, ElementType } from 'react';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';

import {
  EuiFlyoutComponent,
  type EuiFlyoutComponentProps,
} from './flyout.component';

import {
  EuiFlyoutChild,
  EuiFlyoutMain,
  useHasActiveSession,
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
>((props, ref) => {
  const { session, as, onClose, ...rest } = usePropsWithComponentDefaults(
    'EuiFlyout',
    props
  );
  const hasActiveSession = useHasActiveSession();
  const isUnmanagedFlyout = useRef(false);
  const isInManagedFlyout = useIsInManagedFlyout();

  /*
   * Flyout routing logic
   * 1. Main Flyout: When session={true} OR when there's an active session and this flyout
   *    is rendered outside of a managed flyout context.
   * 2. Child Flyout: When there's an active session AND this flyout IS rendered within a
   *    managed flyout context.
   * 3. Standard Flyout: Default fallback when neither condition is met.
   */
  if (session === true || (hasActiveSession && !isInManagedFlyout)) {
    if (isUnmanagedFlyout.current) {
      // TODO: @tkajtoch - We need to find a better way to handle the missing event.
      onClose?.({} as any);
      return null;
    }
    return <EuiFlyoutMain {...rest} onClose={onClose} as="div" />;
  }

  // Else if this flyout is a child of a session AND within a managed flyout context, render EuiChildFlyout.
  if (hasActiveSession && isInManagedFlyout) {
    return <EuiFlyoutChild {...rest} onClose={onClose} as="div" />;
  }

  // TODO: if resizeable={true}, render EuiResizableFlyout.

  isUnmanagedFlyout.current = true;
  return <EuiFlyoutComponent {...rest} onClose={onClose} as={as} ref={ref} />;
});
EuiFlyout.displayName = 'EuiFlyout';

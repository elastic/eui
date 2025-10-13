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
  onActive?: () => void;
  as?: T;
};

export const EuiFlyout = forwardRef<
  HTMLDivElement | HTMLElement,
  EuiFlyoutProps<'div' | 'nav'>
>((props, ref) => {
  const { session, as, onClose, onActive, ...rest } =
    usePropsWithComponentDefaults('EuiFlyout', props);
  const hasActiveSession = useHasActiveSession();
  const isUnmanagedFlyout = useRef(false);
  const isInManagedFlyout = useIsInManagedFlyout();

  // Routing: Main flyout if creating a new session or explicitly set via session prop
  const isNewSession = session === true;
  const shouldBeMain =
    hasActiveSession && !isInManagedFlyout && session !== undefined;

  if (isNewSession || shouldBeMain) {
    if (isUnmanagedFlyout.current) {
      // TODO: @tkajtoch - We need to find a better way to handle the missing event.
      onClose?.({} as any);
      return null;
    }
    return (
      <EuiFlyoutMain {...rest} onClose={onClose} onActive={onActive} as="div" />
    );
  }

  // Routing: Child flyout if within an active session and not creating a new one
  const shouldBeChild =
    hasActiveSession && (isInManagedFlyout || session === undefined);

  if (shouldBeChild) {
    return (
      <EuiFlyoutChild
        {...rest}
        onClose={onClose}
        onActive={onActive}
        as="div"
      />
    );
  }

  // TODO: if resizeable={true}, render EuiResizableFlyout.

  isUnmanagedFlyout.current = true;
  return <EuiFlyoutComponent {...rest} onClose={onClose} as={as} ref={ref} />;
});
EuiFlyout.displayName = 'EuiFlyout';

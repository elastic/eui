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

import { EuiFlyoutChild, EuiFlyoutMain, useHasActiveSession } from './manager';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import { SESSION_INHERIT, SESSION_NEVER, SESSION_START } from './manager/const';

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
  /**
   * Controls the way the session is managed for this flyout.
   * - `start`: Creates a new flyout session. Use this for the main flyout.
   * - `inherit`: (default) Inherits an existing session if one is active, otherwise functions as a standard flyout.
   * - `never`: Opts out of session management and always functions as a standard flyout.
   *
   * Check out [EuiFlyout session management](https://eui.elastic.co/docs/components/containers/flyout/session-management)
   * documentation to learn more.
   * @default 'inherit'
   */
  session?:
    | typeof SESSION_START
    | typeof SESSION_INHERIT
    | typeof SESSION_NEVER;
  /**
   * Callback fired when the flyout becomes active/visible, which may happen programmatically from history navigation.
   */
  onActive?: () => void;
  /**
   * The HTML element to render as the flyout container.
   */
  as?: T;
};

export const EuiFlyout = forwardRef<
  HTMLDivElement | HTMLElement,
  EuiFlyoutProps<'div' | 'nav'>
>((props, ref) => {
  const {
    as,
    onClose,
    onActive,
    session = SESSION_INHERIT,
    ...rest
  } = usePropsWithComponentDefaults('EuiFlyout', props);
  const hasActiveSession = useRef(useHasActiveSession());
  const isUnmanagedFlyout = useRef(false);

  /*
   * Flyout routing logic:
   * - session="start" → Main flyout (creates new session)
   * - session="inherit" + active session → Child flyout (auto-joins, works across React roots!)
   * - session="inherit" + no session → Standard flyout
   * - session="never" → Standard flyout (explicit opt-out)
   */
  if (session !== SESSION_NEVER) {
    if (session === SESSION_START) {
      // session=start: create new session
      if (isUnmanagedFlyout.current) {
        // TODO: @tkajtoch - We need to find a better way to handle the missing event.
        onClose?.({} as any);
        return null;
      }
      return (
        <EuiFlyoutMain
          {...rest}
          onClose={onClose}
          onActive={onActive}
          as="div"
        />
      );
    }

    // session=inherit: auto-join existing session as child
    if (
      hasActiveSession.current &&
      (session === undefined || session === SESSION_INHERIT)
    ) {
      return (
        <EuiFlyoutChild
          {...rest}
          onClose={onClose}
          onActive={onActive}
          as="div"
        />
      );
    }
  }

  isUnmanagedFlyout.current = true;
  return (
    <EuiFlyoutMenuContext.Provider value={{ onClose }}>
      <EuiFlyoutComponent {...rest} onClose={onClose} as={as} ref={ref} />
    </EuiFlyoutMenuContext.Provider>
  );
});

EuiFlyout.displayName = 'EuiFlyout';

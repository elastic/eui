/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  EuiFlyoutComponent,
  type EuiFlyoutComponentProps,
} from './flyout.component';
import { EuiFlyoutMain } from './managed';

export type { EuiFlyoutSize } from './flyout.component';
export { SIDES, PADDING_SIZES, SIZES, TYPES } from './flyout.component';

export interface EuiFlyoutProps extends EuiFlyoutComponentProps {
  session?: boolean;
}

export const EuiFlyout = ({ session, ...props }: EuiFlyoutProps) => {
  // const hasActiveSession = useHasActiveSession();

  // If session={true}, render EuiMainFlyout.
  if (session === true) {
    return <EuiFlyoutMain {...props} />;
  }

  // Else if this flyout is a child of a session, render EuiChildFlyout.
  // if (hasActiveSession) {
  //   return <EuiFlyoutChild {...props} />;
  // }

  // TODO: if resizeable={true}, render EuiResizableFlyout.

  return <EuiFlyoutComponent {...props} />;
};

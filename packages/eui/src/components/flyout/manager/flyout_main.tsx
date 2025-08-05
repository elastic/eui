/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiFlyoutComponentProps } from '../flyout.component';
import { EuiManagedFlyout } from './flyout_managed';

export interface EuiFlyoutMainProps extends EuiFlyoutComponentProps {}

export function EuiFlyoutMain(props: EuiFlyoutMainProps) {
  // TODO:
  // - if there is a child flyout:
  //   - hide the left-hand shadow (NOTE: the left hand shadow only appears if the main flyout type="overlay" and ownFocus={false})
  //   - set ownFocus to false
  return <EuiManagedFlyout level="main" {...props} />;
}

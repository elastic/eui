/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useId, useRef } from 'react';
import { EuiFlyoutComponentProps } from '../flyout.component';

export interface EuiManagedFlyoutProps extends EuiFlyoutComponentProps {}

// The persistent component that renders in the provider
export const EuiManagedFlyout = ({
  id,
  onClose,
  ...props
}: EuiFlyoutComponentProps) => {
  const defaultId = useId();
  const componentIdRef = useRef<string>(id || `persistent-${defaultId}`);

  /*
    TODO: use the id to register or render the flyout, EuiFlyoutComponent.  The point here is to render
    the flyout in the provider, not in the parent, but still respond to the props provided to it by the
    parent.  Past attempts have caused infinite re-renders, or no re-renders at all.
  */

  // This component renders nothing in its parent - it only renders in the provider
  return <></>;
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef } from 'react';

import { EuiFlyout, EuiFlyoutProps } from './flyout';

export type EuiFlyoutResizableProps = {
  maxWidth?: number;
} & Omit<EuiFlyoutProps, 'maxWidth' | 'resizable'>; // If not omitted, the correct props don't show up in the docs prop table

export const EuiFlyoutResizable = forwardRef<
  HTMLDivElement | HTMLElement,
  EuiFlyoutResizableProps
>((props, ref) => {
  return <EuiFlyout ref={ref} {...props} resizable></EuiFlyout>;
});
EuiFlyoutResizable.displayName = 'EuiFlyoutResizable';

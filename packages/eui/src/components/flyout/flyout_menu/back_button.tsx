/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiButtonEmpty } from '../../button';
import type { EuiFlyoutMenuBackButtonProps } from './types';

/**
 * `label` is resolved by `EuiFlyoutMenu`, which owns the `euiFlyoutMenu.*`
 * i18n token namespace.
 */
export const BackButton: React.FC<
  EuiFlyoutMenuBackButtonProps & { label: React.ReactNode }
> = ({ label, ...rest }) => (
  <EuiButtonEmpty
    size="xs"
    color="text"
    iconType="undo"
    data-test-subj="euiFlyoutMenuBackButton"
    {...rest}
  >
    {label}
  </EuiButtonEmpty>
);

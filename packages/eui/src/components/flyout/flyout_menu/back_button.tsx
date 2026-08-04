/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiButtonEmpty } from '../../button';
import { EuiI18n } from '../../i18n';
import type { EuiFlyoutMenuBackButtonProps } from './types';

export const BackButton: React.FC<EuiFlyoutMenuBackButtonProps> = (props) => (
  <EuiButtonEmpty
    size="xs"
    color="text"
    iconType="undo"
    data-test-subj="euiFlyoutMenuBackButton"
    {...props}
  >
    <EuiI18n token="euiFlyoutMenu.back" default="Back" />
  </EuiButtonEmpty>
);

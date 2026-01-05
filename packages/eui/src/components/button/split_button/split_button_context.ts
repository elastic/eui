/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';

import { EuiDisabledProps } from '../../../services';
import { Props as EuiButtonProps } from '../button';

export const EuiSplitButtonContext = createContext<
  EuiDisabledProps & {
    size: NonNullable<EuiButtonProps['size']>;
    color: NonNullable<EuiButtonProps['color']>;
    fill: EuiButtonProps['fill'];
    isLoading?: EuiButtonProps['isLoading'];
  }
>({
  size: 'm',
  color: 'primary',
  fill: false,
});

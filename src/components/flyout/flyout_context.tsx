/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import { EuiFlyoutProps } from './flyout_types';

// interface FlyoutContextProps {
//   paddingSize: EuiFlyoutProps['paddingSize'];
// }

type EuiFlyoutContextValues = Required<Pick<EuiFlyoutProps, 'paddingSize'>>;

export const contextDefaults: EuiFlyoutContextValues = {
  paddingSize: 'l',
};

export const EuiFlyoutContext = createContext<EuiFlyoutContextValues>(
  contextDefaults
);

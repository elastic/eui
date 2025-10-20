/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import { EuiFlyoutProps } from './flyout';
import { LEVEL_CHILD, LEVEL_MAIN } from './manager/const';

interface EuiFlyoutMenuContextProps {
  level?: typeof LEVEL_MAIN | typeof LEVEL_CHILD;
  onClose?: EuiFlyoutProps['onClose'];
}

export const EuiFlyoutMenuContext = createContext<EuiFlyoutMenuContextProps>(
  {}
);

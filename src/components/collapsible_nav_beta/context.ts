/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';

import { _EuiFlyoutSide } from '../flyout/flyout';

type _EuiCollapsibleNavContext = {
  isCollapsed: boolean;
  isPush: boolean;
  side: _EuiFlyoutSide;
};

export const EuiCollapsibleNavContext =
  createContext<_EuiCollapsibleNavContext>({
    isCollapsed: false,
    isPush: true,
    side: 'left',
  });

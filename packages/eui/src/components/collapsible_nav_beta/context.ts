/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, MouseEventHandler } from 'react';

import { _EuiFlyoutSide } from '../flyout/const';

type _EuiCollapsibleNavContext = {
  isCollapsed: boolean;
  isPush: boolean;
  isOverlayOpen: boolean;
  side: _EuiFlyoutSide;
  closePortals?: MouseEventHandler;
};

export const EuiCollapsibleNavContext =
  createContext<_EuiCollapsibleNavContext>({
    isCollapsed: false,
    isPush: true,
    isOverlayOpen: false,
    side: 'left',
  });

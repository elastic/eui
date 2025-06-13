/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export { FlyoutManager, useFlyout } from './flyout_manager';
export { flyoutReducer, initialFlyoutState } from './flyout_reducer';
export type {
  FlyoutAction,
  FlyoutConfig,
  FlyoutGroup,
  FlyoutHistoryState,
  FlyoutRenderContext,
  FlyoutManagerComponentProps,
} from './types';
export {
  useEuiFlyoutApi,
  type OpenMainFlyoutOptions,
  type OpenChildFlyoutOptions,
} from './use_eui_flyout';

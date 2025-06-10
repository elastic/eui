/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

interface FlyoutConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm';
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'onClose' | 'children'>>;
  // EuiFlyoutChildProps is now the direct props type, so the simpler form can be used.
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'onClose' | 'children'>>;
}

export interface FlyoutState {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: FlyoutConfig;
}

export type FlyoutAction =
  | {
      type: 'OPEN_MAIN_FLYOUT';
      payload: Pick<FlyoutConfig, 'mainSize' | 'mainFlyoutProps'>;
    }
  | { type: 'CLOSE_MAIN_FLYOUT' }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: Pick<FlyoutConfig, 'childSize' | 'childFlyoutProps'>;
    }
  | { type: 'CLOSE_CHILD_FLYOUT' }
  | {
      type: 'SET_CONFIG_SIZES';
      payload: Partial<Pick<FlyoutConfig, 'mainSize' | 'childSize'>>;
    };

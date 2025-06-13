/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

export interface FlyoutConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm';
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
}

export interface FlyoutGroup<FlyoutMeta> {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: FlyoutConfig;
  mainOnUnmount?: () => void;
  childOnUnmount?: () => void;
  meta: FlyoutMeta;
}

export interface FlyoutHistoryState<FlyoutMeta = any> {
  activeFlyoutGroup: FlyoutGroup<FlyoutMeta> | null;
  history: Array<FlyoutGroup<FlyoutMeta>>;
}

export type FlyoutAction<FlyoutMeta = any> =
  | {
      type: 'OPEN_MAIN_FLYOUT';
      payload: {
        size: EuiFlyoutSize;
        flyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
        onUnmount?: () => void;
        meta: FlyoutMeta;
      };
    }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: {
        size: 's' | 'm';
        flyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
        onUnmount?: () => void;
        meta: FlyoutMeta;
      };
    }
  | { type: 'CLOSE_CURRENT_FLYOUT' }
  | { type: 'CLOSE_CHILD_FLYOUT' }
  | {
      type: 'UPDATE_ACTIVE_FLYOUT_CONFIG';
      payload: {
        configChanges: Partial<FlyoutConfig>;
        newMainOnUnmount?: () => void;
        newChildOnUnmount?: () => void;
      };
    }
  | { type: 'CLEAR_HISTORY' };

export interface FlyoutRenderContext<FlyoutMeta = any> {
  flyoutSpecificProps: Partial<EuiFlyoutProps | EuiFlyoutChildProps>;
  flyoutSize: EuiFlyoutProps['size'] | EuiFlyoutChildProps['size'];
  flyoutType: 'main' | 'child';
  dispatch: React.Dispatch<FlyoutAction<FlyoutMeta>>;
  activeFlyoutGroup: FlyoutGroup<FlyoutMeta> | null;
  onClose: () => void;
  meta?: FlyoutMeta;
}

export interface FlyoutManagerComponentProps {
  children?: React.ReactNode;
  renderFlyoutContent: (context: FlyoutRenderContext) => React.ReactNode;
}

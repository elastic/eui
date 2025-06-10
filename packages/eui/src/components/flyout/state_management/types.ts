/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

export interface EuiManagedFlyoutConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm';
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
}

export interface EuiManagedFlyoutGroup<FlyoutMeta> {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: EuiManagedFlyoutConfig;
  mainOnUnmount?: () => void;
  childOnUnmount?: () => void;
  meta: FlyoutMeta;
}

export interface EuiManagedFlyoutHistoryState<FlyoutMeta = any> {
  activeFlyoutGroup: EuiManagedFlyoutGroup<FlyoutMeta> | null;
  history: Array<EuiManagedFlyoutGroup<FlyoutMeta>>;
}

export type EuiManagedFlyoutAction<FlyoutMeta = any> =
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
  | { type: 'GO_BACK' }
  | { type: 'CLOSE_CHILD_FLYOUT' }
  | {
      type: 'UPDATE_ACTIVE_FLYOUT_CONFIG';
      payload: {
        configChanges: Partial<EuiManagedFlyoutConfig>;
        newMainOnUnmount?: () => void;
        newChildOnUnmount?: () => void;
      };
    }
  | { type: 'CLEAR_HISTORY' };

export interface EuiManagedFlyoutRenderContext<FlyoutMeta = any> {
  flyoutSpecificProps: Partial<EuiFlyoutProps | EuiFlyoutChildProps>;
  flyoutSize: EuiFlyoutProps['size'] | EuiFlyoutChildProps['size'];
  flyoutType: 'main' | 'child';
  dispatch: React.Dispatch<EuiManagedFlyoutAction<FlyoutMeta>>;
  activeFlyoutGroup: EuiManagedFlyoutGroup<FlyoutMeta> | null;
  onCloseFlyout: () => void;
  onCloseChildFlyout: () => void;
  meta?: FlyoutMeta;
}

export interface EuiFlyoutManagerComponentProps<FlyoutMeta = any> {
  children: React.ReactNode;
  renderMainFlyoutContent: (
    context: EuiManagedFlyoutRenderContext<FlyoutMeta>
  ) => React.ReactNode;
  renderChildFlyoutContent?: (
    context: EuiManagedFlyoutRenderContext<FlyoutMeta>
  ) => React.ReactNode;
}

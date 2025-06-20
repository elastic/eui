/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

export interface EuiFlyoutSessionConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm';
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
}

export interface EuiFlyoutSessionGroup<FlyoutMeta> {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: EuiFlyoutSessionConfig;
  mainOnUnmount?: () => void;
  childOnUnmount?: () => void;
  meta: FlyoutMeta;
}

export interface EuiFlyoutSessionHistoryState<FlyoutMeta = unknown> {
  activeFlyoutGroup: EuiFlyoutSessionGroup<FlyoutMeta> | null;
  history: Array<EuiFlyoutSessionGroup<FlyoutMeta>>;
}

export type EuiFlyoutSessionAction<FlyoutMeta = unknown> =
  | {
      type: 'UPDATE_ACTIVE_FLYOUT_CONFIG';
      payload: {
        configChanges: Partial<EuiFlyoutSessionConfig>;
        newMainOnUnmount?: () => void;
        newChildOnUnmount?: () => void;
      };
    }
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
  | { type: 'CLEAR_HISTORY' };

export interface EuiFlyoutSessionRenderContext<FlyoutMeta = unknown> {
  flyoutProps: Partial<EuiFlyoutProps | EuiFlyoutChildProps>;
  flyoutSize: EuiFlyoutProps['size'] | EuiFlyoutChildProps['size'];
  flyoutType: 'main' | 'child';
  dispatch: React.Dispatch<EuiFlyoutSessionAction<FlyoutMeta>>;
  activeFlyoutGroup: EuiFlyoutSessionGroup<FlyoutMeta> | null;
  onCloseFlyout: () => void;
  onCloseChildFlyout: () => void;
  meta?: FlyoutMeta;
}

export interface EuiFlyoutSessionProviderComponentProps<FlyoutMeta = any> {
  children: React.ReactNode;
  renderMainFlyoutContent: (
    context: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => React.ReactNode;
  renderChildFlyoutContent?: (
    context: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => React.ReactNode;
}

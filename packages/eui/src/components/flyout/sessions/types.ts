/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

/**
 * Configuration used for setting display options for main and child flyouts in a session.
 */
export interface EuiFlyoutSessionConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm';
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
}

/**
 * A configuration user state for past and current main and child flyouts in a session
 * @internal
 */
export interface EuiFlyoutSessionGroup<FlyoutMeta> {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: EuiFlyoutSessionConfig;
  mainOnUnmount?: () => void;
  childOnUnmount?: () => void;
  meta?: FlyoutMeta;
}

/**
 * State used for tracking various EuiFlyoutSessionGroups
 * @internal
 */
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
        meta?: FlyoutMeta;
      };
    }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: {
        size: 's' | 'm';
        flyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
        onUnmount?: () => void;
        meta?: FlyoutMeta;
      };
    }
  | {
      type: 'OPEN_FLYOUT_GROUP';
      payload: {
        main: {
          size: EuiFlyoutSize;
          flyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
          onUnmount?: () => void;
        };
        child: {
          size: 's' | 'm';
          flyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
          onUnmount?: () => void;
        };
        meta?: FlyoutMeta;
      };
    }
  | { type: 'GO_BACK' }
  | { type: 'CLOSE_CHILD_FLYOUT' }
  | { type: 'CLEAR_HISTORY' };

/**
 * Flyout session context managed by `EuiFlyoutSessionProvider`, and passed to the `renderMainFlyoutContent` and `renderChildFlyoutContent` functions.
 */
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

/**
 * Props that can be passed to `EuiFlyoutSessionProvider` to render the main and child flyouts in a session.
 */
export interface EuiFlyoutSessionProviderComponentProps<FlyoutMeta = any> {
  children: React.ReactNode;
  renderMainFlyoutContent: (
    context: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => React.ReactNode;
  renderChildFlyoutContent?: (
    context: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => React.ReactNode;
}

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import type { EuiFlyoutChildProps } from '../flyout_child';

/**
 * Configuration used for setting display options for main and child flyouts in a session.
 */
export interface EuiFlyoutSessionConfig {
  mainSize: EuiFlyoutSize;
  mainTitle?: string;
  hideMainTitle?: boolean;
  childSize?: 's' | 'm';
  childTitle?: string;
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>>;
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>>;
  /**
   * Indicates if the flyout was opened with openManagedFlyout or openFlyout
   */
  isManaged?: boolean;
}

/**
 * Options that control a main flyout in a session
 */
export interface EuiFlyoutSessionOpenMainOptions<Meta = unknown> {
  size: EuiFlyoutSize;
  flyoutProps?: EuiFlyoutSessionConfig['mainFlyoutProps'];
  /**
   * Caller-defined data
   */
  meta?: Meta;
}

export interface EuiFlyoutSessionOpenManagedOptions<Meta = unknown> {
  size: EuiFlyoutSize;
  flyoutProps?: EuiFlyoutSessionConfig['mainFlyoutProps'];
  /**
   * Title to display in top menu bar and in the options of the history popover
   */
  title: string;
  /**
   * Allows title to be hidden from top menu bar. If this is true,
   * the title will only be used for the history popover
   */
  hideTitle?: boolean;
  /**
   * Caller-defined data
   */
  meta?: Meta;
}

/**
 * Options that control a child flyout in a session
 */
export interface EuiFlyoutSessionOpenChildOptions<Meta = unknown> {
  size: 's' | 'm';
  flyoutProps?: EuiFlyoutSessionConfig['childFlyoutProps'];
  title: string;
  /**
   * Caller-defined data
   */
  meta?: Meta;
}

/**
 * Options for opening both a main flyout and child flyout simultaneously
 */
export interface EuiFlyoutSessionOpenGroupOptions<Meta = unknown> {
  main: EuiFlyoutSessionOpenManagedOptions;
  child: EuiFlyoutSessionOpenChildOptions;
  /**
   * Caller-defined data
   */
  meta?: Meta; // Shared meta for both flyouts
}

/**
 * A configuration user state for past and current main and child flyouts in a session
 * @internal
 */
export interface EuiFlyoutSessionGroup<FlyoutMeta> {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: EuiFlyoutSessionConfig;
  /**
   * Caller-defined data
   */
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
      };
    }
  | {
      type: 'OPEN_MAIN_FLYOUT';
      payload: EuiFlyoutSessionOpenMainOptions<FlyoutMeta>;
    }
  | {
      type: 'OPEN_MANAGED_FLYOUT';
      payload: EuiFlyoutSessionOpenManagedOptions<FlyoutMeta>;
    }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: EuiFlyoutSessionOpenChildOptions<FlyoutMeta>;
    }
  | {
      type: 'OPEN_FLYOUT_GROUP';
      payload: EuiFlyoutSessionOpenGroupOptions<FlyoutMeta>;
    }
  | { type: 'GO_BACK' }
  | { type: 'GO_TO_HISTORY_ITEM'; index: number }
  | { type: 'CLOSE_CHILD_FLYOUT' }
  | { type: 'CLOSE_SESSION' };

/**
 * Flyout session context managed by `EuiFlyoutSessionProvider`, and passed to the `renderMainFlyoutContent` and `renderChildFlyoutContent` functions.
 */
export interface EuiFlyoutSessionRenderContext<FlyoutMeta = unknown> {
  activeFlyoutGroup: EuiFlyoutSessionGroup<FlyoutMeta> | null;
  /**
   * Caller-defined data
   */
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
  historyFilter?: (
    history: EuiFlyoutSessionHistoryState<FlyoutMeta>['history'],
    activeFlyoutGroup?: EuiFlyoutSessionGroup<FlyoutMeta> | null
  ) => EuiFlyoutSessionHistoryState<FlyoutMeta>['history'];
  onUnmount?: () => void;
}

export interface EuiFlyoutSessionApi {
  openManagedFlyout: (options: EuiFlyoutSessionOpenManagedOptions) => void;
  openFlyout: (options: EuiFlyoutSessionOpenMainOptions) => void;
  openChildFlyout: (options: EuiFlyoutSessionOpenChildOptions) => void;
  openFlyoutGroup: (options: EuiFlyoutSessionOpenGroupOptions) => void;
  closeChildFlyout: () => void;
  goBack: () => void;
  closeSession: () => void;
  isFlyoutOpen: boolean;
  isChildFlyoutOpen: boolean;
  canGoBack: boolean;
}

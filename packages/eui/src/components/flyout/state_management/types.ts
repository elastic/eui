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
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'children'>> & {
    customData?: any;
  };
  childFlyoutProps?: Partial<Omit<EuiFlyoutChildProps, 'children'>> & {
    customData?: any;
  };
}

export interface FlyoutGroup {
  isMainOpen: boolean;
  isChildOpen: boolean;
  config: FlyoutConfig;
  mainOnUnmount?: () => void;
  childOnUnmount?: () => void;
}

export interface FlyoutHistoryState {
  activeFlyoutGroup: FlyoutGroup | null;
  history: FlyoutGroup[];
}

export type FlyoutAction =
  | {
      type: 'OPEN_MAIN_FLYOUT';
      payload: {
        size: EuiFlyoutSize;
        flyoutProps?: FlyoutConfig['mainFlyoutProps'];
        onUnmount?: () => void;
      };
    }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: {
        size: 's' | 'm';
        flyoutProps?: FlyoutConfig['childFlyoutProps'];
        onUnmount?: () => void;
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

export interface FlyoutRenderContext<C = any> {
  flyoutSpecificProps: Partial<EuiFlyoutProps | EuiFlyoutChildProps> & {
    customData?: C;
  };
  flyoutSize: EuiFlyoutProps['size'] | EuiFlyoutChildProps['size'];
  flyoutType: 'main' | 'child';
  dispatch: React.Dispatch<FlyoutAction>;
  activeFlyoutGroup: FlyoutGroup | null;
  onClose: () => void;
}

export interface FlyoutManagerComponentProps {
  children?: React.ReactNode;
  renderFlyoutContent: (context: FlyoutRenderContext) => React.ReactNode;
}

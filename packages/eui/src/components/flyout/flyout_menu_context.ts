/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useContext } from 'react';
import { EuiFlyoutProps } from './flyout';
import { EuiFlyoutMenuProps } from './flyout_menu';

interface EuiFlyoutMenuContextProps {
  onClose?: EuiFlyoutProps['onClose'];
}

export const EuiFlyoutMenuContext = createContext<EuiFlyoutMenuContextProps>(
  {}
);

interface FlyoutHasMenuWrapperContextValue {
  hasMenuWrapper: boolean;
  setHasMenuWrapper: (hasCustomMenu: boolean) => void;
  // Menu props that should be passed to EuiFlyoutMenu when wrapper renders it
  menuProps?: Pick<
    EuiFlyoutMenuProps,
    'title' | 'historyItems' | 'showBackButton' | 'backButtonProps'
  >;
}

export const FlyoutMenuWrapperContext =
  createContext<FlyoutHasMenuWrapperContextValue>({
    hasMenuWrapper: false,
    setHasMenuWrapper: () => {},
  });

export const useFlyoutHasMenuWrapperContext = () =>
  useContext(FlyoutMenuWrapperContext);

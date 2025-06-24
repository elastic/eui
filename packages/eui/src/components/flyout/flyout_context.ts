/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, RefObject } from 'react';
import { EuiFlyoutSize } from './flyout';

/**
 * Context shared between the main and child flyouts
 * @internal
 */
export interface EuiFlyoutContextValue {
  parentSize?: EuiFlyoutSize | string | number;
  parentFlyoutRef?: RefObject<HTMLDivElement>;
  isChildFlyoutOpen?: boolean;
  setIsChildFlyoutOpen?: (isOpen: boolean) => void;
  childLayoutMode?: 'side-by-side' | 'stacked';
}

export const EuiFlyoutContext = createContext<EuiFlyoutContextValue | null>(
  null
);

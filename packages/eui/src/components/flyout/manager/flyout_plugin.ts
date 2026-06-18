/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ComponentType, createContext } from 'react';

/**
 * Context for integrating external packages with the flyout manager without
 * compile-time coupling.
 *
 * - `historyKey`: tags each session with a history group, removing the need to
 *   pass the prop at every call site.
 * - `MenuBarSlot`: self-contained component (no props) injected into
 *   `EuiFlyoutMenu` in place of the built-in Back button and history popover.
 *
 * Both fields are optional — safe to read without a provider.
 */
export interface EuiFlyoutPluginContextValue {
  historyKey?: symbol;
  MenuBarSlot?: ComponentType<Record<string, never>>;
}

export const EuiFlyoutPluginContext =
  createContext<EuiFlyoutPluginContextValue>({});

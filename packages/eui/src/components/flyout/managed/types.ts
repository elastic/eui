/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { EuiManagedFlyoutBaseProps } from './eui_flyout_managed';

export interface ManagedFlyoutState {
  id: string;
  meta?: Record<string, any>;
}

export interface FlyoutManagerState {
  flyouts: ManagedFlyoutState[];
  activeFlyoutId?: string;
}

export type Action =
  | { type: 'ADD_FLYOUT'; id: string; meta?: Record<string, any> }
  | { type: 'CLOSE_FLYOUT'; id: string }
  | { type: 'SET_ACTIVE'; id: string };

/**
 * Props required to render a managed flyout.
 */
export type RenderManagedFlyoutProps = Pick<
  EuiManagedFlyoutBaseProps,
  'id' | 'onClose'
>;

/**
 * Optional params for creating a flyout renderer.
 */
export type RenderManagedFlyoutParams = Partial<RenderManagedFlyoutProps>;

/**
 * Callback to render a flyout. Returns the flyout id.
 */
export type RenderManagedFlyoutCallback = (
  fn: (props: Required<RenderManagedFlyoutProps>) => React.ReactNode
) => string;

/**
 * A rendered flyout instance, with its element and props.
 */
export interface RenderedManagedFlyout extends RenderManagedFlyoutProps {
  element: React.ReactNode;
}

/**
 * Context value for ManagedFlyout.
 */
export interface ManagedFlyoutContextValue {
  flyouts: ManagedFlyoutState[];
  activeFlyoutId?: string;
  addManagedFlyout: (id: string, meta?: Record<string, any>) => void;
  closeManagedFlyout: (id: string) => void;
  createManagedFlyoutRenderer: (
    params?: RenderManagedFlyoutParams
  ) => RenderManagedFlyoutCallback;
}

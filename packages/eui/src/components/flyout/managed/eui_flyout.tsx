/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useEffect } from 'react';
import {
  EuiFlyout as EuiUnmanagedFlyout,
  _EuiFlyoutProps as EuiUnmanagedFlyoutProps,
} from '../flyout';
import {
  EuiManagedFlyout,
  EuiManagedFlyoutBaseProps,
} from './eui_flyout_managed';
// import { usePropsWithComponentDefaults } from '../../provider/component_defaults';
import { htmlIdGenerator } from '../../../services';
import {
  useCreateManagedFlyoutRenderer,
  useIsManagedFlyoutRendered,
} from './hooks';

/**
 * Props for an unmanaged flyout. Used when `managed` is false or undefined.
 */
interface UnmanagedProps extends EuiUnmanagedFlyoutProps {
  managed?: false;
}

/**
 * Props for a managed flyout. Used when `managed` is true.
 */
type ManagedProps = EuiManagedFlyoutBaseProps & {
  flyoutId?: string;
  managed?: true;
};

/**
 * Props for the EuiFlyout component. Can be either managed or unmanaged.
 */
export type EuiFlyoutProps = UnmanagedProps | ManagedProps;

/**
 * Generates a unique managed flyout id, optionally namespaced by a provided id.
 */
export const generateManagedFlyoutId = (id?: string) =>
  htmlIdGenerator('euiManagedFlyout')(id);

/**
 * Type guard for managed flyout props.
 */
// function isManaged(props: EuiFlyoutProps): props is ManagedProps {
//   return props.managed === true;
// }

/**
 * Internal component for rendering a managed flyout. Handles registration and rendering
 * of the flyout instance in the flyout manager context.
 */
const InternalManagedFlyout = (props: ManagedProps) => {
  // Generate or reuse a flyout id for this managed instance
  const flyoutId = useRef(props.flyoutId || generateManagedFlyoutId());
  // Check if this flyout is already rendered in the tree
  const isRendered = useIsManagedFlyoutRendered();

  // Get a callback that will render this flyout when invoked
  const createManagedFlyoutRenderer = useCreateManagedFlyoutRenderer({
    id: flyoutId.current,
    onClose: props.onClose,
  });

  useEffect(() => {
    // Only create a renderer for the flyout if not already rendered
    if (!isRendered) {
      flyoutId.current = createManagedFlyoutRenderer(
        ({ onClose, id: flyoutId }) => (
          <EuiManagedFlyout {...{ ...props, onClose, flyoutId }} />
        )
      );
    }
  }, [isRendered, props, createManagedFlyoutRenderer]);

  return <EuiManagedFlyout {...{ ...props, flyoutId: flyoutId.current }} />;
};

/**
 * EuiFlyout component. Renders either a managed or unmanaged flyout based on props.
 *
 * - If `managed` is true, uses InternalManagedFlyout (which uses context for stacking, etc).
 * - Otherwise, renders the legacy/unmanaged flyout.
 */
export const EuiFlyout = (initialProps: EuiFlyoutProps) => {
  // const propsWithDefaults = usePropsWithComponentDefaults(
  //   'EuiFlyout',
  //   initialProps
  // );

  const { managed, ...props } = initialProps;

  if (managed) {
    return <InternalManagedFlyout {...props} />;
  } else {
    return <EuiUnmanagedFlyout {...props} />;
  }
};

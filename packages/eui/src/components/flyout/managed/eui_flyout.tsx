/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useEffect } from 'react';
import {
  EuiFlyout as EuiFlyoutUnmanaged,
  _EuiFlyoutProps as EuiFlyoutUnmanagedProps,
} from '../flyout';
import {
  EuiFlyoutManaged,
  EuiFlyoutManagedBaseProps,
} from './eui_flyout_managed';
// import { usePropsWithComponentDefaults } from '../../provider/component_defaults';
import { htmlIdGenerator } from '../../../services';
import { useCreateFlyoutRenderer, useIsFlyoutRendered } from './flyout_manager';

/**
 * Props for an unmanaged flyout. Used when `managed` is false or undefined.
 */
interface UnmanagedProps extends EuiFlyoutUnmanagedProps {
  managed?: false;
}

/**
 * Props for a managed flyout. Used when `managed` is true.
 */
type ManagedProps = EuiFlyoutManagedBaseProps & {
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
  htmlIdGenerator('euiFlyout')(id);

/**
 * Type guard for managed flyout props.
 */
// function isManaged(props: EuiFlyoutProps): props is ManagedProps {
//   return props.managed === true;
// }

/**
 * Internal component for rendering a managed flyout.
 */
/**
 * Internal component for rendering a managed flyout. Handles registration and rendering
 * of the flyout instance in the flyout manager context.
 */
const InternalManagedFlyout = (props: ManagedProps) => {
  // Generate or reuse a flyout id for this managed instance
  const flyoutId = useRef(props.flyoutId || generateManagedFlyoutId());
  // Check if this flyout is already rendered in the tree
  const isRendered = useIsFlyoutRendered();

  // Get a callback that will render this flyout when invoked
  const createFlyoutRenderer = useCreateFlyoutRenderer({
    id: flyoutId.current,
    onClose: props.onClose,
  });

  useEffect(() => {
    // Only register the flyout if not already rendered
    if (!isRendered) {
      flyoutId.current = createFlyoutRenderer(({ onClose, id: flyoutId }) => (
        <EuiFlyoutManaged {...{ ...props, onClose, flyoutId }} />
      ));
    }
  }, [isRendered, props, createFlyoutRenderer]);

  // Always render the managed flyout with its id
  return <EuiFlyoutManaged {...{ ...props, flyoutId: flyoutId.current }} />;
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
    return <EuiFlyoutUnmanaged {...props} />;
  }
};

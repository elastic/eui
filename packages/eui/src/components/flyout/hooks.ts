/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useIsWithinMinBreakpoint, useEuiTheme } from '../../services';
import { EuiFlyoutProps } from './flyout';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { DEFAULT_PUSH_MIN_BREAKPOINT, DEFAULT_TYPE } from './const';

/**
 * Determines if a flyout should be rendered in a "pushed" state based on its
 * configuration and the current window or container size.
 *
 * When `containerWidth` is provided, the push/overlay breakpoint decision
 * is based on the container's measured width rather than the viewport width.
 * This ensures flyouts scoped to a container respond to the available space
 * within that container. The caller is responsible for observing the
 * container's width (e.g. via `useResizeObserver`) so that no duplicate
 * observer is created here.
 */
export const useIsPushed = (
  props: Pick<EuiFlyoutProps, 'type' | 'pushMinBreakpoint'> & {
    containerWidth?: number;
  }
) => {
  const {
    type = DEFAULT_TYPE,
    pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
  } = usePropsWithComponentDefaults('EuiFlyout', props);

  const {
    euiTheme: { breakpoint: breakpoints },
  } = useEuiTheme();

  // Always called to satisfy React hook rules; used as fallback
  // when no container width is provided.
  const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(pushMinBreakpoint);

  const isLargeEnoughToPush =
    props.containerWidth != null
      ? props.containerWidth >= breakpoints[pushMinBreakpoint]
      : windowIsLargeEnoughToPush;

  return type === 'push' && isLargeEnoughToPush;
};

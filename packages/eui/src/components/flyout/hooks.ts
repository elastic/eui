/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useIsWithinMinBreakpoint, useEuiTheme } from '../../services';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiFlyoutProps } from './flyout';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { DEFAULT_PUSH_MIN_BREAKPOINT, DEFAULT_TYPE } from './const';

/**
 * Determines if a flyout should be rendered in a "pushed" state based on its
 * configuration and the current window or container size.
 *
 * When `containerElement` is provided, the push/overlay breakpoint decision
 * is based on the container's width rather than the viewport width. This
 * ensures flyouts scoped to a container respond to the available space
 * within that container.
 */
export const useIsPushed = (
  props: Pick<EuiFlyoutProps, 'type' | 'pushMinBreakpoint'> & {
    containerElement?: HTMLElement | null;
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
  // when no container element is provided.
  const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(pushMinBreakpoint);

  // Observe container width so the push/overlay decision reacts to
  // container resizes, not just viewport resizes.
  const containerDimensions = useResizeObserver(
    props.containerElement ?? null,
    'width'
  );

  const isLargeEnoughToPush = props.containerElement
    ? (containerDimensions.width || props.containerElement.clientWidth) >=
      breakpoints[pushMinBreakpoint]
    : windowIsLargeEnoughToPush;

  return type === 'push' && isLargeEnoughToPush;
};

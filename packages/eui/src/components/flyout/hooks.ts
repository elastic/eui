/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useIsWithinMinBreakpoint } from '../../services';
import { EuiFlyoutProps } from './flyout';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { DEFAULT_PUSH_MIN_BREAKPOINT, DEFAULT_TYPE } from './const';

/**
 * Determines if a flyout should be rendered in a "pushed" state based on its
 * configuration and the current window size.
 */
export const useIsPushed = (
  props: Pick<EuiFlyoutProps, 'type' | 'pushMinBreakpoint'>
) => {
  const {
    type = DEFAULT_TYPE,
    pushMinBreakpoint = DEFAULT_PUSH_MIN_BREAKPOINT,
  } = usePropsWithComponentDefaults('EuiFlyout', props);

  const windowIsLargeEnoughToPush = useIsWithinMinBreakpoint(pushMinBreakpoint);
  return type === 'push' && windowIsLargeEnoughToPush;
};

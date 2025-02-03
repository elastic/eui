/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { waitFor } from '@testing-library/react';
import { WaitForOptions } from '../../utils/rtl/internal';
import { EuiToolTipSelectors } from './selectors';

// EuiToolTip waits until the end of animation before
// removing the popover element from DOM
const ANIMATION_TIMEOUT = 3000;

/**
 * Get EuiToolTip popover element if it's currently rendered
 */
const getPopoverElement = (container?: HTMLElement) => {
  const target = container ?? document;
  return target.querySelector(EuiToolTipSelectors.POPOVER);
};

/**
 * Wait until the <EuiToolTip> popover is visible
 */
const waitForVisible = (
  container?: HTMLElement,
  options: WaitForOptions = {
    timeout: ANIMATION_TIMEOUT, // Account for long delay on tooltips
  }
) => {
  return waitFor(() => {
    expect(getPopoverElement(container)).toBeVisible();
  }, options);
};

/**
 * Wait until the <EuiToolTip> popover is hidden
 */
const waitForHidden = (
  container?: HTMLElement,
  options: WaitForOptions = {
    timeout: ANIMATION_TIMEOUT, // Account for long delay on tooltips
  }
) => {
  return waitFor(() => {
    expect(getPopoverElement(container)).toBeNull();
  }, options);
};

export const EuiToolTipTestHelpers = {
  getPopoverElement,
  waitForVisible,
  waitForHidden,
};

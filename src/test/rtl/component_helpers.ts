/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

/**
 * Ensure the EuiPopover being tested is open/closed before continuing
 * Note: Because EuiPopover is portalled, we want to query `document`
 * instead of the `container` returned by RTL's render()
 */
export const waitForEuiPopoverOpen = async () =>
  await waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeTruthy();
  });

export const waitForEuiPopoverClose = async () =>
  await waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeFalsy();
  });

/**
 * Ensure the EuiToolTip being tested is open and visible before continuing
 */
export const waitForEuiToolTipVisible = async () =>
  await waitFor(
    () => {
      const tooltip = document.querySelector('.euiToolTipPopover');
      expect(tooltip).toBeVisible();
    },
    { timeout: 1500 } // Account for long delay on tooltips
  );

export const waitForEuiToolTipHidden = async () =>
  await waitFor(() => {
    const tooltip = document.querySelector('.euiToolTipPopover');
    expect(tooltip).toBeNull();
  });

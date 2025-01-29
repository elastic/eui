/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { waitFor } from '@testing-library/react';

const waitForOpen = () => {
  return waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeTruthy();
  });
}

const waitForClose = () => {
  return waitFor(() => {
    const openPopover = document.querySelector('[data-popover-open]');
    expect(openPopover).toBeFalsy();
  });
};

export const EuiPopoverTestHelpers = {
  waitForOpen,
  waitForClose,
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { waitFor } from '@testing-library/react';

const waitForVisible = () => {
  return waitFor(
    () => {
      const tooltip = document.querySelector('.euiToolTipPopover');
      expect(tooltip).toBeVisible();
    },
    { timeout: 3000 } // Account for long delay on tooltips
  );
};

const waitForHidden = () => {
  return waitFor(() => {
    const tooltip = document.querySelector('.euiToolTipPopover');
    expect(tooltip).toBeNull();
  });
};

export const EuiToolTipTestHelpers = {
  waitForVisible,
  waitForHidden,
};

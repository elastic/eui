/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { EuiPopoverTestHelpers } from '../popover/rtl';

const showOptions = async () => {
  fireEvent.click(screen.getByTestSubject('comboBoxToggleListButton'));
  await EuiPopoverTestHelpers.waitForOpen();
  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
};

export const EuiComboBoxTestHelpers = {
  showOptions,
};

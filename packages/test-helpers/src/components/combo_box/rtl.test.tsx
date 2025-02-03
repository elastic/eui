/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { EuiComboBox } from '@elastic/eui';
import { testHelpersScreen } from '../../utils/rtl/internal';
import { withEuiProvider } from '../../utils/rtl';
import { EuiComboBoxTestHelpers } from './rtl';
import { EuiComboBoxSelectors } from './selectors';

const render = withEuiProvider(rtlRender);

describe('EuiComboBoxTestHelpers', () => {
  const options = [
    { label: 'Lorem' },
    { label: 'ipsum' },
    { label: 'dolor' },
    { label: 'sit' },
    { label: 'amet' },
  ];

  beforeEach(() => {
    render(<EuiComboBox options={options} />);
  });

  it('is sane', () => {
    expect(testHelpersScreen.getByTestSubject(EuiComboBoxSelectors.TEST_SUBJ)).toBeInTheDocument();
  });

  it('isOptionsListOpen()', async () => {
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(false);

    fireEvent.click(testHelpersScreen.getByTestSubject(EuiComboBoxSelectors.OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ));
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(true);

    fireEvent.click(testHelpersScreen.getByTestSubject(EuiComboBoxSelectors.OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ));
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(false);
  });

  it('openOptionsList()', async () => {
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(false);

    await EuiComboBoxTestHelpers.openOptionsList();
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(true);

    await EuiComboBoxTestHelpers.openOptionsList();
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(true);
  });

  it('closeOptionsList()', async () => {
    await EuiComboBoxTestHelpers.openOptionsList();
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(true);

    await EuiComboBoxTestHelpers.closeOptionsList();
    await expect(EuiComboBoxTestHelpers.isOptionsListOpen()).resolves.toBe(false);
  });
});

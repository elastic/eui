/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  render,
  renderHook,
  renderHookAct,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';
import { useDataGridKeyboardShortcuts } from './keyboard_shortcuts';

describe('useDataGridKeyboardShortcuts', () => {
  it('returns a popover containing a list of keyboard shortcuts', async () => {
    const { result } = renderHook(() => useDataGridKeyboardShortcuts());
    const { getByTestSubject, rerender } = render(
      <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
    );

    renderHookAct(() =>
      getByTestSubject('dataGridKeyboardShortcutsButton').click()
    );
    rerender(
      <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
    );
    await waitForEuiPopoverOpen();

    expect(getByTestSubject('hookRoot')).toMatchSnapshot();
  });
});

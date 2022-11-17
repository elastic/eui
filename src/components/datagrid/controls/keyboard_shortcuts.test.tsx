/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, waitForEuiPopoverOpen } from '../../../test/rtl';
import { useDataGridKeyboardShortcuts } from './keyboard_shortcuts';

describe('useDataGridKeyboardShortcuts', () => {
  it('returns a popover containing a list of keyboard shortcuts', async () => {
    const { result } = renderHook(() => useDataGridKeyboardShortcuts());
    const { baseElement, getByTestSubject, rerender } = render(
      <>{result.current.keyboardShortcuts}</>
    );

    act(() => getByTestSubject('dataGridKeyboardShortcutsButton').click());
    rerender(<>{result.current.keyboardShortcuts}</>);
    await waitForEuiPopoverOpen();

    expect(baseElement).toMatchSnapshot();
  });
});

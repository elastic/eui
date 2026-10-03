/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  renderHook,
  renderHookAct,
  waitForEuiPopoverOpen,
} from '../../../test/rtl';
import { testByReactVersion } from '../../../test/internal';

import { useDataGridKeyboardShortcuts } from './keyboard_shortcuts';

const setPlatform = (platform: string) => {
  Object.defineProperty(navigator, 'platform', {
    configurable: true,
    get: () => platform,
  });
};

describe('useDataGridKeyboardShortcuts', () => {
  const originalPlatform = navigator.platform;

  afterEach(() => {
    setPlatform(originalPlatform);
  });

  testByReactVersion(
    'returns a popover containing a list of keyboard shortcuts',
    async () => {
      setPlatform('Win32');

      const { result } = renderHook(() => useDataGridKeyboardShortcuts());
      const { baseElement, getByTestSubject, rerender } = render(
        <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
      );

      renderHookAct(() => {
        fireEvent.click(getByTestSubject('dataGridKeyboardShortcutsButton'));
      });
      rerender(
        <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
      );
      await waitForEuiPopoverOpen();

      expect(baseElement).toMatchSnapshot();
    }
  );

  it('labels the copy shortcut as Cmd on Mac', async () => {
    setPlatform('MacIntel');

    const { result } = renderHook(() => useDataGridKeyboardShortcuts());
    const { getByTestSubject, getByText, rerender } = render(
      <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
    );

    renderHookAct(() => {
      fireEvent.click(getByTestSubject('dataGridKeyboardShortcutsButton'));
    });
    rerender(
      <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
    );
    await waitForEuiPopoverOpen();

    expect(getByText('Cmd')).toBeTruthy();
  });
});

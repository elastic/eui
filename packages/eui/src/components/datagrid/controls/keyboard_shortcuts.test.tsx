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
import { EuiThemeProvider } from '../../../services';

import { useDataGridKeyboardShortcuts } from './keyboard_shortcuts';

const shortcutTitleSelector = /^\.[\w-]+ :where\(\.euiDescriptionList\) dt$/;

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
      const { baseElement, getByTestSubject, getByText, getByRole, rerender } =
        render(
          <div data-test-subj="hookRoot">
            {result.current.keyboardShortcuts}
          </div>
        );

      renderHookAct(() => {
        fireEvent.click(getByTestSubject('dataGridKeyboardShortcutsButton'));
      });
      rerender(
        <div data-test-subj="hookRoot">{result.current.keyboardShortcuts}</div>
      );
      await waitForEuiPopoverOpen();

      const title = getByText('Up arrow').closest('dt');
      const description = getByText('Move one cell up');
      const text = title?.closest('.euiText');

      expect(text).toBe(getByRole('region', { name: 'Keyboard shortcuts' }));
      expect(text).toContainElement(description);
      expect(text).toHaveStyleRule('font-size', '1.0000rem', {
        target: shortcutTitleSelector,
      });
      expect(description).toHaveStyleRule('font-size', '1.0000rem');
      expect(baseElement).toMatchSnapshot();
    }
  );

  it('uses the same font size for titles and descriptions with a custom medium scale', async () => {
    const KeyboardShortcuts = () => {
      const { keyboardShortcuts } = useDataGridKeyboardShortcuts();
      return <>{keyboardShortcuts}</>;
    };

    const { getByTestSubject, getByText } = render(
      <EuiThemeProvider modify={{ font: { scale: { m: 1.5 } } }}>
        <KeyboardShortcuts />
      </EuiThemeProvider>
    );

    fireEvent.click(getByTestSubject('dataGridKeyboardShortcutsButton'));
    await waitForEuiPopoverOpen();

    const title = getByText('Up arrow').closest('dt');
    const description = getByText('Move one cell up');
    const text = title?.closest('.euiText');

    expect(text).toContainElement(description);
    expect(text).toHaveStyleRule('font-size', '1.5000rem', {
      target: /^\.[\w-]+ dt$/,
    });
    expect(text).toHaveStyleRule('font-size', '1.0000rem', {
      target: shortcutTitleSelector,
    });
    expect(text).toHaveStyleRule('line-height', '1.4286rem', {
      target: shortcutTitleSelector,
    });
    expect(description).toHaveStyleRule('font-size', '1.0000rem');
    expect(description).toHaveStyleRule('line-height', '1.4286rem');
  });

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

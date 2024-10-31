/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl';
import {
  useEuiButtonColorCSS,
  BUTTON_DISPLAYS,
  useEuiButtonFocusCSS,
} from './_button';

describe('useEuiButtonColorCSS', () => {
  BUTTON_DISPLAYS.forEach((display) => {
    test(display, () => {
      const { result } = renderHook(() => useEuiButtonColorCSS({ display }));
      expect(result.current).toMatchSnapshot();
    });
  });
});

test('useEuiButtonFocusCSS', () => {
  const { result } = renderHook(() => useEuiButtonFocusCSS());
  expect(result.current).toMatchSnapshot();
});
